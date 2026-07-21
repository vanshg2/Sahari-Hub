import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateCustomerDto, UpdateCustomerDto, CreateAddressDto, CustomerQueryDto,
} from './dto/customer.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: CustomerQueryDto) {
    const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { addresses: true, _count: { select: { orders: true } } },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        addresses: true,
        orders: { orderBy: { createdAt: 'desc' }, include: { items: true } },
      },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async findByPhone(phone: string) {
    return this.prisma.customer.findUnique({
      where: { phone },
      include: { addresses: true },
    });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async addAddress(customerId: string, dto: CreateAddressDto) {
    await this.findOne(customerId);
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.create({
      data: { ...dto, customerId },
    });
  }

  async getAddresses(customerId: string) {
    return this.prisma.address.findMany({
      where: { customerId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async removeAddress(addressId: string) {
    return this.prisma.address.delete({ where: { id: addressId } });
  }

  async getStats() {
    const [totalCustomers, newThisMonth, topSpenders] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.customer.count({
        where: { createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } },
      }),
      this.prisma.customer.findMany({
        orderBy: { lifetimeSpend: 'desc' },
        take: 10,
        include: { _count: { select: { orders: true } } },
      }),
    ]);

    return { totalCustomers, newThisMonth, topSpenders };
  }
}
