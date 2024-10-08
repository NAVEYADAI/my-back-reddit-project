import { SubCategory } from 'src/sub-category/sub-category.entity';
import { User } from 'src/user/user.entity';
import { Response } from 'src/response/response.entity';

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
export class Post {
  //uid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('float')
  grade: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  text: string;

  //user id
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  user: User;

  //subCategory
  @ManyToOne(() => SubCategory, (subCategory) => subCategory.posts, {
    nullable: false,
  })
  subCategory: SubCategory;

  //response
  @ManyToMany(() => Response, (response) => response.post, )
  @JoinTable({name:'post_response'})
  responses: Response[];
}
