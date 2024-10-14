import { Category } from "./category.entity";

export type CategoryType = {
  id?: number;
  name: string;
};

export type CreateCategory = Pick<Category, 'name' | 'iconName'>
