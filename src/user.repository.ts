export class UserRepository {
  private users = [];

  async store(user) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }
}
