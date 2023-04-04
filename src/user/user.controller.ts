import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userRepository.store(userEntity);
    return { id: userEntity.id, message: 'user created successfully' };
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
