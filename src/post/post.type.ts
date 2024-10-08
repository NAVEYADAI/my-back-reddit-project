import { Post } from './post.entity';

export type CreatePostDto = UpdatePostDto & {
  userId: number;
  subCategoryId: number;
};

export type CreatePostToSave = UpdatePostDto & Pick<Post, 'user' | 'subCategory' >;

export type UpdatePostDto = Partial<Pick<Post, 'text' | 'title' | 'image'>>;

export type BetweenObjectGrade = {
  min: number;
  max: number;
};

export type PostToSend = Post & {
  userName: string;
};

