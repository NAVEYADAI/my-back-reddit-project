import { DataSource, Like, Repository } from 'typeorm';
import { Response } from './response.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponseToSave, UpdateResponseDto } from './response.type';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class ResponseRepository extends Repository<Response> {
  constructor(dataSource: DataSource) {
    super(Response, dataSource.createEntityManager());
  }

  async getResponsesByPostId(postId: string, userId: number) {
    return await this.createQueryBuilder('response').select()
    .leftJoin('response.user', 'user')
    .leftJoin('post_response', 'pr', 'pr.responseId = response.id') 
    .leftJoin('Like', 'like' , 'like.idOfEntity = response.id and like.isLike = true')
    .leftJoin('Like', 'like2', 'like2.idOfEntity = response.id and like2.userId = :userId', {userId})
    .leftJoin('Like', 'like3', 'like3.idOfEntity = response.id and like3.isLike = false')
    .leftJoin('response.responseMe', 'responseMe')
    .addSelect('CAST(COUNT(DISTINCT responseMe.id) AS integer)', 'responseCount')
    .addSelect('CAST(COUNT(DISTINCT like.id) AS integer)', 'likeCount')
    .addSelect('CAST(COUNT(DISTINCT like3.id) AS integer)', 'disLikeCount')
    .addSelect('like2.isLike', 'myLike')
    .addSelect('user.userName', 'userName')
    .where('pr.postId = :postId', { postId }) 
    .groupBy('user.id, response.id, like2.id')
    .orderBy('response.createdAt', 'DESC')
    .getRawMany();
  }

  async getAllResponses(): Promise<Response[]> {
    return await this.createQueryBuilder('response')
    .leftJoin('response.user', 'user')
    .leftJoin('Like', 'like', 'like.idOfEntity = response.id')
    .leftJoin('Like', 'like2', 'like2.idOfEntity = response.id and like2.userId = user.id')
    .addSelect('COUNT(DISTINCT like.id )', 'likeCount')
    .addSelect('like2.isLike', 'myLike')
    .addSelect('user.userName', 'userName')
    .groupBy('user.id, response.id, like2.id')
    .orderBy('response.createdAt', 'DESC')
    .getRawMany();
   }

  async saveNewResponeList(response: Response) {
    return await this.save(response);
  }

  async getResponseToResponse(responseId: string, userId: number){
    return await this.createQueryBuilder('response')
        .leftJoin('response.user', 'user')
        .leftJoin('response_response', 'rr', 'rr.responseId_2 = response.id')
        .leftJoin('Like', 'like', 'like.idOfEntity = rr.responseId_2 and like.isLike = true')
        .leftJoin('Like', 'like2', 'like2.idOfEntity = response.id and like2.userId = :userId', {userId})
        .leftJoin('Like', 'like3', 'like3.idOfEntity = response.id and like3.isLike = false')
        .leftJoin('response.responseMe', 'responseMe')
        .addSelect('CAST(COUNT(DISTINCT responseMe.id) AS integer)', 'responseCount')
        .addSelect('CAST(COUNT(DISTINCT like.id) AS integer)', 'likeCount')
        .addSelect('CAST(COUNT(DISTINCT like3.id) AS integer)', 'disLikeCount')
        .addSelect('like2.isLike', 'myLike')
        .addSelect('user.userName', 'userName')
        .where('rr.responseId_1 = :responseId', { responseId })
        .groupBy('user.id, response.id, like2.id, rr.responseId_2, rr.responseId_1')
        .orderBy('response.createdAt', 'DESC')
        .getRawMany();
  }

  async getResponseById(id: string): Promise<Response> {
    return await this.findOne({
      where: { id: id.toString() },
      //  'responseTo.responseTo' 
      relations: ['responseTo' , 'user' , 'responseTo.responseTo' , 'responseTo.user' , 'responseTo.responseTo.responseTo'],
      order: {createdAt: 'desc'}
    });
  }

  async createResponse(
    createResponseToSave: CreateResponseToSave,
  ): Promise<Response> {
    try {
      return await this.save(createResponseToSave);
    } catch (error) {
      console.log(error);
      if (error.code === '23503') {
        if (error.detail.includes('userId')) {
          throw new NotFoundException(
            `User with ID ${createResponseToSave.user.id} is not founded`,
          );
        }
      }
      throw error;
    }
  }

  async updateResponse(id: string, updateResponseDto: UpdateResponseDto) {
    return await this.update(id, updateResponseDto);
  }

  async deleteResponse(id: string) {
    return await this.delete({ id });
  }
}
