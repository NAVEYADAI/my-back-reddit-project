import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { UserModule } from 'src/user/user.module';
import { Like } from './like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
