import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto.js';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  isDefault?: boolean;
}

export class CustomerQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  phone?: string;
}
