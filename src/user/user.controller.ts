import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

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
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'user created successfully',
    };
  }

  @Get()
  async listUsers() {
    const users = await this.userRepository.list();

    const listUsers = users.map((user) => new ListUserDTO(user.id, user.name));

    return listUsers;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    const userUpdated = await this.userRepository.update(id, userData);

    return {
      user: userUpdated,
      message: 'user updated successfully',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userRepository.remove(id);

    return {
      user,
      message: 'user removed successfully',
    };
  }
}
