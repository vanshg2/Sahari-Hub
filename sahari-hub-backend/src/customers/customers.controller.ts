import {
  Controller, Get, Patch, Delete, Param, Body, Query, UseGuards, Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { UpdateCustomerDto, CreateAddressDto, CustomerQueryDto } from './dto/customer.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: CustomerQueryDto) {
    return this.customersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.customersService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.customersService.findByPhone(phone);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/addresses')
  addAddress(@Param('id') id: string, @Body() dto: CreateAddressDto) {
    return this.customersService.addAddress(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/addresses')
  getAddresses(@Param('id') id: string) {
    return this.customersService.getAddresses(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('addresses/:addressId')
  removeAddress(@Param('addressId') addressId: string) {
    return this.customersService.removeAddress(addressId);
  }
}
