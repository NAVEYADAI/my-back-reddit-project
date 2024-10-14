import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategory } from './category.type';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  

  async getCategoryById(id: number): Promise<Category> {
    return await this.findOneBy({ id });
  }

  async getAllCatefories() {
    return await this.find({      
      relations:['subCategories']
    });
  }

  async createCategory(createCategory: CreateCategory) {
    return await this.save( createCategory )
  }

  async updateNameById(id: number, name: string) {
    return await this.update(id, { name });
  }

  async deleteCategoryById(id: number) {
    return await this.delete({ id });
  }
}
