import {
  Controller, Get, Post, Patch, Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto, UpdateOrderStatusDto, OrderQueryDto } from './dto/order.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Post('verify-payment')
  verifyPayment(@Body() dto: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
    return this.ordersService.verifyPayment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: OrderQueryDto) {
    return this.ordersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.ordersService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.ordersService.findByCustomer(customerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('number/:orderNumber')
  findByOrderNumber(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}
