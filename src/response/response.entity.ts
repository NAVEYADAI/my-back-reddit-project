import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  //uid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('float')
  grade: number;

  @Column()
  description: string;

  @Column()
  haveAResponse: boolean;

  //user id
  @ManyToOne(() => User, (user) => user.response, { nullable: false })
  user: User;

  //post id
  @ManyToMany(() => Post, (post) => post.responses, { 
    nullable: true ,})
  @JoinTable({ name: 'post_response' })
  post: Post[];

  @ManyToMany(() => Response, (response) => response.responseTo, {
    nullable: true,
  })
  @JoinTable({ name: 'response_response' })
  responseMe: Response[];

  @ManyToMany(() => Response, (response) => response.responseMe, {
    nullable: true,
  })
  @JoinTable({ name: 'response_response' })
  responseTo: Response[];
}