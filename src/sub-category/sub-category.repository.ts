import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { UpdateSubCategoryDto, SubCategoryToSave } from './sub-category.type';

@Injectable()
export class SubCategoryRepository extends Repository<SubCategory> {
  constructor(dataSource: DataSource) {
    super(SubCategory, dataSource.createEntityManager());
  }
  
  async getAllSubCategories(): Promise<SubCategory[]> {
    return await this.find();
  }

  async getSubCategoryById(id: number): Promise<SubCategory> {
    return await this.findOneBy({ id });
  }

  async getSubCategoryIdByName(name: string){
    const subCategory = await this.findOneBy({ name })
    if( subCategory ){
      return subCategory.id;
    }
    throw new NotFoundException(`SubCategory by ${name} is not founded`);
  }

  async createSubCategory( subCategoryToSave:SubCategoryToSave): Promise<SubCategory> {
    try{
      return await this.save(subCategoryToSave);
    }catch(error){
      console.log(error)
      // code: '23503',
      // detail: 'Key (categoryId)=(56) is not present in table "category".',
      if( error.code === '23503' ){
        if (error.detail.includes('categoryId')) {
          throw new NotFoundException(`User with ID ${subCategoryToSave.category.id} not found`);
        } 
      }
      throw error
    }
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return await this.update(id, updateSubCategoryDto);
  }
  
  async deleteSubCategory(id: number) {
    return await this.delete({ id });
  }
}
