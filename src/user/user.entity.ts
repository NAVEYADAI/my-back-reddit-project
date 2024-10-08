import { Like } from 'src/like/like.entity';
import { Post } from 'src/post/post.entity';
// import { ResponseToResponse } from 'src/response-to-response/response-to-response.entity';
import { Response } from 'src/response/response.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  adrress: string;

  @Column()
  phone: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Response, (response) => response.user)
  response: Response[];

  // @OneToMany(
  //   () => ResponseToResponse,
  //   (responseToResponse) => responseToResponse.user,
  // )
  // responseToResponse: ResponseToResponse[];
}
