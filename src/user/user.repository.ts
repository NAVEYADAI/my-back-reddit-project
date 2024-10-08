import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpType, UpdateUserPartial } from './user.type';
import { NotFoundError } from 'rxjs';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  
  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.findOneBy({ id });
  }

  async signUp(signUpType: SignUpType) {
    try {
      return await this.save(signUpType);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('UserName arleady exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  
  async findUserByUserName(userName: string) {
    const user = await this.findOneBy({ userName });
    if(user){
      return user;
    }else {
      throw new NotFoundException(`User with userName ${userName} is not founded`)
    }
  }

  async updateUser(id: number, user: UpdateUserPartial) {
    return await this.update(id, user);
  }

  async deleteUser(id: number) {
    return await this.delete({ id });
  }
}
