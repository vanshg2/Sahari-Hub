import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './dto/order.dto.js';
import { Prisma } from '@prisma/client';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private generateOrderNumber(): string {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `SH-${num}`;
  }

  async create(dto: CreateOrderDto) {
    const customer = await this.prisma.customer.upsert({
      where: { phone: dto.phone },
      create: {
        phone: dto.phone,
        firstName: dto.firstName || 'Guest',
        lastName: dto.lastName || '',
        email: dto.email,
      },
      update: {
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.email && { email: dto.email }),
      },
    });

    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    let subtotal = 0;
    const orderItems = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
      };
    });

    const tax = Math.round(subtotal * 0.18 * 100) / 100;
    const shippingCost = subtotal >= 2000 ? 0 : 99;
    const totalAmount = subtotal + tax + shippingCost;

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber: this.generateOrderNumber(),
          customerId: customer.id,
          subtotal,
          tax,
          shippingCost,
          totalAmount,
          shippingName: dto.shippingName,
          shippingPhone: dto.shippingPhone,
          shippingAddress: dto.shippingAddress,
          items: { create: orderItems },
        },
        include: {
          items: { include: { product: true } },
          customer: true,
        },
      });

      for (const item of dto.items) {
        const product = products.find((p) => p.id === item.productId)!;
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            quantity: -item.quantity,
            reason: `Sale (${created.orderNumber})`,
          },
        });
      }

      await tx.customer.update({
        where: { id: customer.id },
        data: {
          totalOrders: { increment: 1 },
          lifetimeSpend: { increment: totalAmount },
        },
      });

      return created;
    });

    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const rzpOrder = await razorpay.orders.create({
          amount: Math.round(totalAmount * 100),
          currency: 'INR',
          receipt: order.orderNumber,
        });

        const updatedOrder = await this.prisma.order.update({
          where: { id: order.id },
          data: { razorpayOrderId: rzpOrder.id },
          include: {
            customer: true,
            items: { include: { product: true } },
          },
        });

        return updatedOrder;
      } catch (error) {
        console.error('Razorpay creation error:', error);
      }
    }

    return order;
  }

  async findAll(query: OrderQueryDto) {
    const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc', status, customerId, paymentStatus } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(search && {
        OR: [
          { orderNumber: { contains: search } },
          { shippingName: { contains: search } },
        ],
      }),
      ...(status && { status }),
      ...(customerId && { customerId }),
      ...(paymentStatus && { paymentStatus }),
    };

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: true,
          items: { include: { product: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByOrderNumber(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    const validStatuses = ['PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
    if (!validStatuses.includes(dto.status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    if (dto.status === 'CANCELLED' && order.status !== 'CANCELLED') {
      const items = await this.prisma.orderItem.findMany({ where: { orderId: id } });
      for (const item of items) {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { increment: item.quantity } },
        });
        await this.prisma.stockMovement.create({
          data: {
            productId: item.productId,
            quantity: item.quantity,
            reason: `Cancellation refund (${order.orderNumber})`,
          },
        });
      }
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });
  }

  async findByCustomer(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: { include: { product: true } },
      },
    });
  }

  async getStats() {
    const [totalOrders, totalRevenue, recentOrders, ordersByStatus] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: { not: 'CANCELLED' } } }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: true, items: true },
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: true,
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      recentOrders,
      ordersByStatus,
    };
  }

  async verifyPayment(dto: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
    if (!process.env.RAZORPAY_KEY_SECRET) throw new BadRequestException('Razorpay secret not configured');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(dto.razorpay_order_id + '|' + dto.razorpay_payment_id)
      .digest('hex');

    if (expectedSignature === dto.razorpay_signature) {
      const order = await this.prisma.order.findUnique({
        where: { razorpayOrderId: dto.razorpay_order_id },
      });

      if (!order) throw new NotFoundException('Order not found');

      return this.prisma.order.update({
        where: { id: order.id },
        data: {
          paymentId: dto.razorpay_payment_id,
          paymentStatus: 'PAID',
          status: 'PROCESSING',
        },
      });
    } else {
      throw new BadRequestException('Invalid signature');
    }
  }
}
