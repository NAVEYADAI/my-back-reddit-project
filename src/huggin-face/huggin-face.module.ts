import { Module } from '@nestjs/common';
import { HugginFaceService } from './huggin-face.service';

@Module({
  providers: [HugginFaceService],
  exports: [HugginFaceService]
})
export class HugginFaceModule {}
