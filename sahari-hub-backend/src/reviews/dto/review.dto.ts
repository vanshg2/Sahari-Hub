import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  product?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  product?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
