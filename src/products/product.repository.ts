import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products = [];

  async store(product) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }
}
