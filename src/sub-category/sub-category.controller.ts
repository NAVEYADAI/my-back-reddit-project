import {
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
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './sub-category.entity';
import { CreateSubCategory, UpdateSubCategoryDto } from './sub-category.type';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Get()
  async getAllSubCategories(): Promise<SubCategory[]> {
    return await this.subCategoryService.getAllSubCategories();
  }

  @Get('/:name')
  async getSubCategoryIdByName(
    @Param('name') name:string
  ){
    return await this.subCategoryService.getSubCategoryIdByName(name);
  }
  @Get('/:id')
  async getSubCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubCategory> {
    return await this.subCategoryService.getSubCategoryById(id);
  }

  @Post()
  async createSubCategory(
    @Body() createSubCategory: CreateSubCategory,
  ): Promise<SubCategory> {
    return await this.subCategoryService.createSubCategory(createSubCategory);
  }

  @Patch('/:id')
  async updateSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return await this.subCategoryService.updateSubCategory(
      id,
      updateSubCategoryDto,
    );
  }

  @Delete('/:id')
  async deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.subCategoryService.deleteSubCategory(id);
  }
}