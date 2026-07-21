import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service.js';
import { ContactDto } from './dto/contact.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() dto: ContactDto) {
    return this.contactService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }
}
