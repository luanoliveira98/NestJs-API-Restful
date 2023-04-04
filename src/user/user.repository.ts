import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async store(user) {
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
}
