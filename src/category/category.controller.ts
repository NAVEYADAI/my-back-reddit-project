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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType, CreateCategory } from './category.type';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  
  @Get('tmp')
  tmp(){
    return 'tmp'
  }

  @Get()
  async getAllCategories(): Promise<CategoryType[]> {
    return await this.categoryService.getAllCatefories();
  }

  @Get('/:id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() createCategory: CreateCategory) {
    return await this.categoryService.createCategory(createCategory);
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
