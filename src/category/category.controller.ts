import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType } from './category.type';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryType[]> {
    return await this.categoryService.getAllCatefories();
  }

  @Get('/:id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body('name') name: string) {
    return await this.categoryService.createCategory(name);
  }

  @Patch('/:id/name')
  async updateCategoryName(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ){
    return await this.categoryService.updateCategoryName(id, name);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
