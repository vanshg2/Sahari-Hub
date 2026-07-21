import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      recentOrders,
      unreadMessages,
    ] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.customer.count(),
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { not: 'CANCELLED' } },
      }),
      this.prisma.order.count({ where: { status: 'PENDING_PAYMENT' } }),
      this.prisma.product.findMany({
        where: { stockQuantity: { lte: 5 }, isPublished: true },
        take: 5,
        orderBy: { stockQuantity: 'asc' },
        select: { id: true, name: true, sku: true, stockQuantity: true },
      }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { firstName: true, lastName: true, email: true } },
          items: true,
        },
      }),
      this.prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    return {
      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        pendingOrders,
        unreadMessages,
      },
      lowStockProducts,
      recentOrders,
    };
  }
}
