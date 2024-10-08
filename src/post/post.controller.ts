import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.type';
import { HugginFaceService } from 'src/huggin-face/huggin-face.service';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private hugging: HugginFaceService,
  ) {}

  @Get('/getPostByFilters')
  async getPostByFilter(
    @Query('subCategories', new ParseArrayPipe({ optional: true }))
    subCategories: number[],
    @Query('userId') userId: number

  ) {
    return await this.postService.getPostBySubCategoryBetweenGrade(
      subCategories,
      { min: 0, max: 1 },
      userId,
    );
  }

  @Get('/getPostByFilters/positive')
  async getPostByFilterPositive(
    @Query('subCategories', new ParseArrayPipe({ optional: true }))
    subCategories: number[],
    @Query('userId') userId: number
  ) {
    // post.grade > 0.5 AND post.grade <= 1
    return await this.postService.getPostBySubCategoryBetweenGrade(
      subCategories,
      { min: 0.6, max: 1 },
      userId,
    );
  }

  @Get('getPostByFilters/negative')
  async getPostByFiltersNegative(
    @Query('subCategories', new ParseArrayPipe({ optional: true }))
    subCategories: number[],
    @Query('userId') userId: number
  ) {
    //post.grade = 0.5

    return await this.postService.getPostBySubCategoryBetweenGrade(
      subCategories,
      { min: 0.4, max: 0.6 },
      userId,
    );
  }

  @Get('getPostByFilters/neutral')
  async getPostByFilters(
    @Query('subCategories', new ParseArrayPipe({ optional: true }))
    subCategories: number[],
    @Query('userId') userId: number
  ) {
    //post.grade >= 0 AND post.grade < 0.5
    console.log(subCategories);
    return await this.postService.getPostBySubCategoryBetweenGrade(
      subCategories,
      { min: 0, max: 0.4 },
      userId,
    );
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return await this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto);
  }

  @Patch('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    console.log(updatePostDto);
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }

  @Post('/callForHugging')
  async tmp(@Body('ddd') ddd: string) {
    return this.hugging.createGradeByHugging(ddd);
  }
}
