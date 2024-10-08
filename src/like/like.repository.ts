import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './like.entity';
import { LikeDto, LikeToSave, UpdateLikeDto } from './like.type';

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }

  async haveLikeByUserIdAndIdOfEntity(userId: number, idOfEntity: string){
    return await this.findOne({where: {user:{id: userId}, idOfEntity}});
  }

  async findLike(updateLikeDto: UpdateLikeDto){
    return  await this.exists({where: {idOfEntity: updateLikeDto.idOfEntity, isLike: updateLikeDto.isLike }})
  }

  async getAllLike(): Promise<Like[]> {
    return await this.find();
  }
  
  async getLikeById(id: number): Promise<Like> {
    return await this.findOneBy({ id });
  }

  async createLike(likeToSave: LikeToSave) {
    try {
      return await this.save(likeToSave);
    } catch (error) {
      console.log(error)
      if(error.code === '23503'){
        //detail: 'Key (userId)=(12) is not present in table "user".',
        if (error.detail.includes('userId')) {
          throw new NotFoundException(`User with ID ${likeToSave.user.id} is not founded`);
        }
      }
      throw error 
    }
  }

  async updateLikeOrDisLike(id: number, updateLikeDto: UpdateLikeDto) {
    try{
      return await this.update(id, updateLikeDto);
    }catch(error){
      console.log(error)
    }
  }

  async deleteLike(id: number) {
    return await this.delete({ id });
  }
}
