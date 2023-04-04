import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/unique-email.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'name can not be empty' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'sended email is invalid' })
  @UniqueEmail({ message: 'email already exists' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'password must has at least 6 characters' })
  @IsOptional()
  password: string;
}
