import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryRepository } from './sub-category.repository';
import { SubCategory } from './sub-category.entity';
import {
  CreateSubCategory,
  SubCategoryToSave,
  UpdateSubCategoryDto,
} from './sub-category.type';
import { Category } from 'src/category/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  async getAllSubCategories(): Promise<SubCategory[]> {
    return await this.subCategoryRepository.getAllSubCategories();
  }

  async getSubCategoryById(id: number): Promise<SubCategory> {
    return await this.subCategoryRepository.getSubCategoryById(id);
  }

  async getSubCategoryIdByName(name: string) {
    return await this.subCategoryRepository.getSubCategoryIdByName(name);
  }

  async createSubCategory(
    createSubCategory: CreateSubCategory,
  ): Promise<SubCategory> {
    if (!createSubCategory.name || createSubCategory.name.trim() === '') {
      throw new BadRequestException('Category name should not be empty');
    }
    const subCategoryToSave = this.createSubCategoryToSave(createSubCategory);
    return await this.subCategoryRepository.createSubCategory(
      subCategoryToSave,
    );
  }

  createSubCategoryToSave(
    createSubCategory: CreateSubCategory,
  ): SubCategoryToSave {
    const category = new Category();
    category.id = createSubCategory.categoryId;

    const subCategoryToSave: SubCategoryToSave = {
      ...createSubCategory,
      category,
    };

    return subCategoryToSave;
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return await this.subCategoryRepository.updateSubCategory(
      id,
      updateSubCategoryDto,
    );
  }

  async deleteSubCategory(id: number) {
    return await this.subCategoryRepository.deleteSubCategory(id);
  }
}
