import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async store(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async emailAlreadyExists(email: string) {
    const emailAlreadyExists = await this.users.find(
      (user) => user.email === email,
    );

    return emailAlreadyExists !== undefined;
  }

  private getById(id: string) {
    const userById = this.users.find((user) => user.id === id);

    if (!userById) {
      throw new Error('User does not exist');
    }

    return userById;
  }

  async update(id: string, userData: Partial<UserEntity>) {
    const userToUpdate = this.getById(id);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;

      userToUpdate[key] = value;
    });

    return userToUpdate;
  }

  async remove(id: string) {
    const userToRemove = this.getById(id);

    this.users = this.users.filter((user) => user.id !== userToRemove.id);

    return userToRemove;
  }
}
