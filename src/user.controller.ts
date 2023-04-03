import { UserRepository } from './user.repository';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/users')
export class UserController {
  private userRepository = new UserRepository();

  @Post()
  async createUser(@Body() userData) {
    this.userRepository.store(userData);
    return userData;
  }
}
