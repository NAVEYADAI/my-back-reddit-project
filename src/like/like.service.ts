import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { Like } from './like.entity';
import { ClickLikeOrDisLikeType, LikeDto, LikeToSave, UpdateLikeDto } from './like.type';
import { User } from 'src/user/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,
  ) {}

  async clickLike( clickLikeOrDisLikeType:ClickLikeOrDisLikeType){
    const like = await this.likeRepository.haveLikeByUserIdAndIdOfEntity(clickLikeOrDisLikeType.userId, clickLikeOrDisLikeType.idOfEntity)

    if(like){
      if(like.isLike === clickLikeOrDisLikeType.isLike){
        // delete
        console.log('delete')
        await this.likeRepository.deleteLike(like.id);
        return null;
      }else {
        //update
        console.log('update')
        await this.likeRepository.updateLikeOrDisLike(like.id, {idOfEntity:clickLikeOrDisLikeType.idOfEntity, isLike:clickLikeOrDisLikeType.isLike});
        return clickLikeOrDisLikeType.isLike;
      }
    } else {
      //create
      console.log('create')
      await this.createLike(clickLikeOrDisLikeType);
      return clickLikeOrDisLikeType.isLike;
    }
  }

  async getAllLike(): Promise<Like[]> {
    return await this.likeRepository.getAllLike();
  }

  async getLikeById(id: number): Promise<Like> {
    const found = await this.likeRepository.getLikeById(id);
    if (!found) {
      throw new NotFoundException(`Like with Id ${id} not found`);
    }
    return found;
  }

  createLikeToSave(createLikeDto: LikeDto):LikeToSave{
    const user = new User();
    user.id = createLikeDto.userId; 

    var likeToSave:LikeToSave = {...createLikeDto, user}
    console.log(likeToSave)
    return likeToSave
  }

  async createLike(createLikeDto: LikeDto) {
    const likeToSave = this.createLikeToSave(createLikeDto);
    return await this.likeRepository.createLike(likeToSave);
  }

  async updateLikeOrDisLike(id: number, updateLikeDto: UpdateLikeDto) {
    return await this.likeRepository.updateLikeOrDisLike(id, updateLikeDto);
  }

  async deleteLike(id: number) {
    return await this.likeRepository.deleteLike(id);
  }
}
