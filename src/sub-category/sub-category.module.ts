import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './sub-category.entity';
import { SubCategoryRepository } from './sub-category.repository';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory]), CategoryModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepository],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
