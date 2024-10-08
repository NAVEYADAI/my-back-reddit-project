import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { UserModule } from 'src/user/user.module';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';
import { HugginFaceModule } from 'src/huggin-face/huggin-face.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule, SubCategoryModule, HugginFaceModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
