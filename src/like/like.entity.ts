import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  //user id
  @ManyToOne(() => User, (user) => user.likes, { nullable: false })
  user: User;

  @Column('uuid')
  idOfEntity: string;

  @Column()
  isLike: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
