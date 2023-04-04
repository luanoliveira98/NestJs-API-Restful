import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async store(product: ProductEntity) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  private getById(id: string) {
    const productById = this.products.find((product) => product.id === id);

    if (!productById) {
      throw new Error('product does not exist');
    }

    return productById;
  }

  async update(id: string, product: Partial<ProductEntity>) {
    const productToUpdate = this.getById(id);

    Object.entries(product).forEach(([key, value]) => {
      if (key === 'id') return;

      productToUpdate[key] = value;
    });

    return productToUpdate;
  }

  async remove(id: string) {
    const productToRemove = this.getById(id);

    this.products = this.products.filter(
      (product) => product.id !== productToRemove.id,
    );

    return productToRemove;
  }
}
