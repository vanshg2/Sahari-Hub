import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/create-product.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const { images, ...data } = dto;

    const existing = await this.prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) throw new ConflictException('Product with this slug already exists');

    const skuExists = await this.prisma.product.findUnique({ where: { sku: data.sku } });
    if (skuExists) throw new ConflictException('Product with this SKU already exists');

    return this.prisma.product.create({
      data: {
        ...data,
        images: images
          ? {
              create: images.map((img, idx) => ({
                url: img.url,
                altText: img.altText,
                isPrimary: img.isPrimary ?? idx === 0,
                order: img.order ?? idx,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc', categoryId, categorySlug, isPublished, minPrice, maxPrice } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { sku: { contains: search } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(isPublished !== undefined && { isPublished }),
      ...(minPrice !== undefined && { price: { gte: minPrice } }),
      ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: true,
          images: { orderBy: { order: 'asc' } },
        },
      }),
      this.prisma.product.count({ where }),
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
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findFeatured(limit = 8) {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findRelated(productId: string, categoryId: string, limit = 4) {
    return this.prisma.product.findMany({
      where: {
        id: { not: productId },
        categoryId,
        isPublished: true,
      },
      take: limit,
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Product not found');

    if (dto.slug && dto.slug !== existing.slug) {
      const slugExists = await this.prisma.product.findUnique({ where: { slug: dto.slug } });
      if (slugExists) throw new ConflictException('Product with this slug already exists');
    }

    const { images, ...data } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((img, idx) => ({
              url: img.url,
              altText: img.altText,
              isPrimary: img.isPrimary ?? idx === 0,
              order: img.order ?? idx,
            })),
          },
        }),
      },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Product not found');
    return this.prisma.product.delete({ where: { id } });
  }
}
