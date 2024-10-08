import { User } from 'src/user/user.entity';
import { Response } from './response.entity';
import { Post } from 'src/post/post.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export type basicResponse = Pick<Response, 'description'> & {
  userId?: number;
};

export type CreateResponseDto = basicResponse & {
  postId: string;
};

export type CreateResponseToResponse = basicResponse & {
  responseId: string;
};

export type CreateResponseToSave = basicResponse & {
  user:User;
  post?:Post[];
  grade:number;
  haveAResponse:boolean;
};

export type UpdateResponseDto = basicResponse & {
  postId?: string;
};

export type ResponseToSend = Response & {
  userName: string
}