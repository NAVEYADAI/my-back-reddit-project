import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './user-sign-up.dto';
import { User } from './user.entity';
import { SignInType, UpdateUserPartial } from './user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) userDto: SignUpDto) {
    console.log( userDto )
    return await this.userService.signUp(userDto);
  }

  @Post('/signin')
  async signIn(
    @Body() signInType:SignInType,
  ) {
    console.log('sing in try')
    return await this.userService.signIn(signInType);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserPartial
  ) {
    return await this.userService.updateUser(
      id,
      updateUserDto
    );
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}