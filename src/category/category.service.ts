import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryType } from './category.type';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoryRepository.getCategoryById(id);
    if (!found) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return found;
  }

  

  async getAllCatefories(): Promise<Category[]> {
    return await this.categoryRepository.getAllCatefories();
  }

  async createCategory(name: string): Promise<Category> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Category name should not be empty');
    }
    return await this.categoryRepository.createCategory(name);
  }

  async updateCategoryName(id: number, name: string) {
    return await this.categoryRepository.updateNameById(id, name);
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.deleteCategoryById(id);
  }
}
