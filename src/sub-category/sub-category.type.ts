import { SubCategory } from './sub-category.entity';

export type UpdateSubCategoryDto = Partial<Pick<SubCategory, 'name'>> & {
  categoryId?: number;
};

export type CreateSubCategory = Pick<SubCategory, 'name'> & {
  categoryId: number;
};

export type SubCategoryToSave = Pick<SubCategory, 'name' | 'category'>;