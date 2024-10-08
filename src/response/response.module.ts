import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { ResponseRepository } from './response.repository';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { HugginFaceModule } from 'src/huggin-face/huggin-face.module';

@Module({
  imports: [TypeOrmModule.forFeature([Response]), PostModule, UserModule, HugginFaceModule],
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
  exports: [ResponseService],
})
export class ResponseModule {}
