import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'name can not be empty' })
  name: string;

  @IsEmail(undefined, { message: 'sended email is invalid' })
  email: string;

  @MinLength(6, { message: 'password must has at least 6 characters' })
  password: string;
}
