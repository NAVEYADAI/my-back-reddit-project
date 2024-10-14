import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Request,
  SetMetadata,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './user-sign-up.dto';
import { User } from './user.entity';
import { SignInType, UpdateUserPartial } from './user.type';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('user')
@UseGuards(JwtAuthGuard)

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
  
  // @UseGuards(JwtAuthGuard)
  @Post('/tokenIsGood')
  async tmp (){
    return 'tmp'
  }

  @Post('/signup')
  @SetMetadata('isPublic', true) 
  async signUp(@Body(ValidationPipe) userDto: SignUpDto) {
    console.log(userDto);
    return await this.userService.signUp(userDto);
  }

  @Post('/signin')
  @SetMetadata('isPublic', true) 
  async signIn(@Body() signInType: SignInType) {
    return await this.userService.signIn(signInType);
  }


  @Post('test')
  // @UseGuards(JwtAuthGuard)
  test(@Request() req) {
    console.log('Headers:', req.user);
    return req.user;
  }

  @Patch('/:id')
  // @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserPartial,
  ) {
    console.log('in update func')
    return await this.userService.updateUser(id, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
