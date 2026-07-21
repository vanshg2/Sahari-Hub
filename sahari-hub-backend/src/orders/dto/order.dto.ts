import {
  IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsEnum, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto.js';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  @IsNotEmpty()
  shippingName: string;

  @IsString()
  @IsNotEmpty()
  shippingPhone: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class OrderQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  paymentStatus?: string;
}
