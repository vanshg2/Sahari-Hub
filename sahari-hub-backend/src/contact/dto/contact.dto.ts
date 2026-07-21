import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}
