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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
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

  async getUserByUser(user: User) {
    return await this.userRepository.getUserByUser(user);
  }

  async signUp(userDto: SignUpDto) {
    const signUpObject: SignUpType = await this.CreateSignUpObject(userDto);
    const user = await this.userRepository.signUp(signUpObject);
    const {password, salt, ...newUser} = user
      const accessToken = await this.jwtService.signAsync(
        newUser,
        { expiresIn: '30h' },
      );
      return {accessToken, user: newUser};
  }

  async CreateSignUpObject(userDto: SignUpDto): Promise<SignUpType> {
    const { userName, fName, lName, address, phone } = userDto;
    var { password } = userDto;
    const salt = await bcrypt.genSalt();
    const signUpType: SignUpType = {
      userName: userName,
      password: await bcrypt.hash(password, salt),
      firstName: fName,
      lastName: lName,
      adrress: address,
      phone: phone,
      salt: salt,
    };
    return signUpType;
  }

  async getUserByUserName(userName: string) {
    const user = await this.userRepository.findUserByUserName(userName);
    return user;
  }

  async signIn(signInType: SignInType) {
    const user = await this.userRepository.findUserByUserName(
      signInType.userName,
    );
    const hash = await bcrypt.hash(signInType.password, user.salt);
    if (hash === user.password) {
      const {password, salt, ...newUser} = user
      const accessToken = await this.jwtService.signAsync(
        newUser,
        { expiresIn: '1h' },
      );
      return {accessToken, user: newUser};
    } else {
      throw new UnauthorizedException();
    }
  }

  async createjwt(user: User) {
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        adrress: user.adrress,
        phone: user.phone,
      },
      { expiresIn: '1h' },
    );
    console.log('AccessToken:', accessToken);
    return accessToken;
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserPartial) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }
}
