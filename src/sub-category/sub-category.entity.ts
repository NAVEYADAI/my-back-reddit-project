import { Category } from 'src/category/category.entity';
import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    nullable: false,
  })
  category: Category;

  @OneToMany(() => Post, (post) => post.subCategory)
  posts: Post[];
}
