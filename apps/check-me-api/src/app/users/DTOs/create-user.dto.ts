import { ICreateUserDto } from '@check-me/models';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @MinLength(5, { message: 'Username must be at least 5 characters long' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @MinLength(10, { message: 'Phone number must be at least 10 characters long' })
  phoneNumber: string;
}
