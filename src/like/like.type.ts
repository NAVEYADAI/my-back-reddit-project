import { Like } from './like.entity';

export type UpdateLikeDto = Pick<Like, 'idOfEntity' | 'isLike'>;

export type LikeDto = UpdateLikeDto & {
  userId: number;
};

export type ClickLikeOrDisLikeType = UpdateLikeDto & {
  // id?:number;
  userId:number;
} 

export type LikeToSave = LikeDto & Pick<Like, 'user' > & Omit<LikeDto,'userId'>