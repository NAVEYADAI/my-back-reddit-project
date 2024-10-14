import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from './like.entity';
import { ClickLikeOrDisLikeType, LikeDto, UpdateLikeDto } from './like.type';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Patch('likeOrDislike')
  async clickLike(
    @Body() clickLikeOrDisLikeType:ClickLikeOrDisLikeType){
      return await this.likeService.clickLike(clickLikeOrDisLikeType)
  }

  @Get()
  async getAllLike(): Promise<Like[]> {
    return await this.likeService.getAllLike();
  }

  @Get('/:id')
  async getLikeById(@Param('id', ParseIntPipe) id: number): Promise<Like> {
    return await this.likeService.getLikeById(id);
  }

  @Post()
  async createLike(@Body() createLikeDto: LikeDto) {
    return await this.likeService.createLike(createLikeDto);
  }

  @Patch('/:id')
  async updateLikeOrDisLike(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLikeDto: UpdateLikeDto,
  ) {
    return await this.likeService.updateLikeOrDisLike(id, updateLikeDto);
  }

  @Delete('/:id')
  async deleteLike(@Param('id', ParseIntPipe) id: number) {
    return await this.likeService.deleteLike(id);
  }
}
