import { Any, Between, DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BetweenObjectGrade,
  CreatePostToSave,
  UpdatePostDto,
} from './post.type';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async updateResponses(post: Post): Promise<Post> {
    return await this.save(post);
  }

  async getPostBySubCategoryBetweenGrade(
    subCategory: number[],
    betweenObjectGrade: BetweenObjectGrade,
    userId: number
  ): Promise<Post[]> {

    try{
      return await this.createQueryBuilder('post')
      .where('post.subCategory IN (:...subCategory)', {subCategory})
      .andWhere('post.grade BETWEEN :min AND :max', {min: betweenObjectGrade.min, max: betweenObjectGrade.max})
      .leftJoin('post.user', 'user')
      .addSelect('user.userName', 'userName')
      .leftJoin('post.responses', 'responses')
      .addSelect('CAST(COUNT(DISTINCT responses) AS integer)', 'responseCount')
      .leftJoin('Like', 'likes', 'likes.idOfEntity = post.id and likes.isLike = true')
      .leftJoin('Like', 'disLikes', 'disLikes.idOfEntity = post.id and disLikes.isLike = false')
      .leftJoin('Like', 'myLike', 'myLike.idOfEntity = post.id and myLike.userId = :userId', {userId})
      .addSelect('myLike.isLike', 'myLike')
      .addSelect('CAST(COUNT(DISTINCT likes.id) AS integer)', 'likeCount')
      .addSelect('CAST(COUNT(DISTINCT disLikes.id) AS integer)', 'disLikeCount')
      .orderBy('post.createdAt', 'DESC')

      .groupBy('post.id, user.id, myLike.id')
      .getRawMany()
      return await this.find({
        where: {
          subCategory: Any(subCategory),
          grade: Between(betweenObjectGrade.min, betweenObjectGrade.max),
        },
        relations: [
          'user',
          'responses',
          'responses.responseTo',
          'responses.user',
          'responses.responseTo.responseTo',
        ],
        order: {
          createdAt: 'DESC',
        },
      });
    }catch(error){
      console.log(error)
    }
  }

  async getPostBetweenGrade(betweenObjectGrade: BetweenObjectGrade, userId: number) {
    try{
      return await this.createQueryBuilder('post')
      .andWhere('post.grade BETWEEN :min AND :max', {min: betweenObjectGrade.min, max: betweenObjectGrade.max})
      .leftJoin('post.user', 'user')
      .addSelect('user.userName', 'userName')
      .leftJoin('post.responses', 'responses')
      .addSelect('CAST(COUNT(DISTINCT responses) AS integer)', 'responseCount')
      .leftJoin('Like', 'likes', 'likes.idOfEntity = post.id and likes.isLike = true')
      .leftJoin('Like', 'disLikes', 'disLikes.idOfEntity = post.id and disLikes.isLike = false')
      .leftJoin('Like', 'myLike', 'myLike.idOfEntity = post.id and myLike.userId = :userId', {userId})
      .addSelect('myLike.isLike', 'myLike')
      .addSelect('CAST(COUNT(DISTINCT likes.id) AS integer)', 'likeCount')
      .addSelect('CAST(COUNT(DISTINCT disLikes.id) AS integer)', 'disLikeCount')
      .groupBy('post.id, user.id, myLike.id')
      .orderBy('post.createdAt', 'DESC')
      .getRawMany()
    return await this.find({
        where: {
          grade: Between(betweenObjectGrade.min, betweenObjectGrade.max),
        },
        relations: [
          'user',
          'responses',
          'responses.responseTo',
          'responses.user',
          'responses.responseTo.responseTo',
        ],
        order: {
          createdAt: 'DESC',
        },
        });}catch(error){
          console.log(error)
        }
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.find({
      relations: [
        'user',
        'responses',
        'responses.responseTo',
        'responses.user',
        'responses.responseTo.responseTo',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getPostById(id: string) {
    return await this.findOne({
      where: {
        id,
      },
      relations: [
        'user',
        'responses',
        'responses.responseTo',
        'responses.user',
        'responses.responseTo.responseTo',
      ],
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async createPost(createPostToSave: CreatePostToSave): Promise<Post> {
    try {
      return await this.save(createPostToSave);
    } catch (error) {
      // Key (userId)=(99) is not present in table "user".
      if (error.code === '23503') {
        if (error.detail.includes('userId')) {
          throw new NotFoundException(
            `User with ID ${createPostToSave.user.id} is not founded`,
          );
        } else {
          throw new NotFoundException(
            `SubCategory with ID ${createPostToSave.subCategory.id} is not founded`,
          );
        }
      }
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return await this.update(id, updatePostDto);
  }

  async deletePost(id: string) {
    return await this.delete({ id });
  }
}
