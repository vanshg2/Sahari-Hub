import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ContactDto } from './dto/contact.dto.js';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ContactDto) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async getUnreadCount() {
    return this.prisma.contactMessage.count({
      where: { isRead: false },
    });
  }
}
