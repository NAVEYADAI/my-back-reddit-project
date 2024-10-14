import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ResponseModule } from './response/response.module';
import { LikeModule } from './like/like.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ConfigModule } from '@nestjs/config';
import { Category } from 'src/category/category.entity';
import { Like } from 'src/like/like.entity';
import { Post } from 'src/post/post.entity';
import { Response } from 'src/response/response.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { User } from 'src/user/user.entity';
import { HugginFaceModule } from './huggin-face/huggin-face.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_DATABASE,
      entities: [
        Category,
        Like,
        Post,
        Response,
        SubCategory,
        User,
      ],
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: +process.env.DATABASE_PORT,
      synchronize: true,
      type: `postgres` ,
      username: process.env.DATABASE_USERNAME
    }),
    UserModule,
    PostModule,
    ResponseModule,
    LikeModule,
    CategoryModule,
    SubCategoryModule,
    HugginFaceModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
