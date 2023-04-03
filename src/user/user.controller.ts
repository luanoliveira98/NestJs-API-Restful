import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    this.userRepository.store(userData);
    return userData;
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
