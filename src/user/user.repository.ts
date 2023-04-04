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

  async update(id: string, userData: Partial<UserEntity>) {
    const userToUpdate = this.users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new Error('User does not exist');
    }

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;

      userToUpdate[key] = value;
    });

    return userToUpdate;
  }
}
