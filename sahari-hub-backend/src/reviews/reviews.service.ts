import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateReviewDto) {
    return this.prisma.review.create({ data: dto });
  }

  findAll() {
    return this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findActive() {
    return this.prisma.review.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.review.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
