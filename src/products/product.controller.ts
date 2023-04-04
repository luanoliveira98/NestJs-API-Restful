import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductEntity } from './product.entity';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.name = productData.name;
    productEntity.value = productData.value;
    productEntity.quantity = productData.quantity;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;
    productEntity.userId = productData.userId;

    this.productRepository.store(productEntity);
    return { product: productEntity, message: 'product created successfully' };
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const product = await this.productRepository.update(id, productData);

    return { product, message: 'product updated successfully' };
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const product = await this.productRepository.remove(id);

    return { product, message: 'product removed successfully' };
  }
}
