import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './user-sign-up.dto';
import { User } from './user.entity';
import { SignInType, SignUpType, UpdateUserPartial } from './user.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.getUserById(id);
    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return found;
  }
  
  async signUp(userDto: SignUpDto) {
    
    const signUpObject: SignUpType = await this.CreateSignUpObject(userDto);
    return await this.userRepository.signUp(signUpObject);
  }

  async CreateSignUpObject(userDto: SignUpDto):Promise<SignUpType>{
    const {userName, fName, lName, address, phone} = userDto;
    var {password} = userDto
    const salt = await bcrypt.genSalt();
    const signUpType: SignUpType={
      userName:userName,
      password :  await bcrypt.hash(password, salt),
      firstName: fName,
      lastName: lName,
      adrress: address,
      phone: phone,
      salt: salt
    }
    return signUpType;
  }
  
  async signIn(signInType:SignInType) {
    const user = await this.userRepository.findUserByUserName( signInType.userName);
    const hash = await bcrypt.hash(signInType.password, user.salt);
    if( hash === user.password){
      return user;
    }else{
      return false;
    }
  }
  
  async deleteUser(id: number) {
    return  await this.userRepository.deleteUser(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserPartial) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }
}
