import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { BetweenObjectGrade, CreatePostDto, CreatePostToSave, PostToSend, UpdatePostDto } from './post.type';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { User } from 'src/user/user.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { Response } from 'src/response/response.entity';
import { HugginFaceService } from 'src/huggin-face/huggin-face.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private subCategoryService:SubCategoryService,
    private hugging: HugginFaceService,
  ) {}

  async getCategoryIdOfSubCategories(subCategories: string[]):Promise<number[]>{
    var subCategoriesId: number[] = [];
    for (let index = 0; index < subCategories.length; index++) {
      const subCategoryId =await  this.subCategoryService.getSubCategoryIdByName(subCategories[index]);
      subCategoriesId.push(subCategoryId);
    }
    // const subCategoriesId = await Promise.all(
    //   subCategories.map(async (subCategory) => 
    //     this.subCategoryService.getSubCategoryIdByName(subCategory)
    //   )
    // );
    return subCategoriesId
  }

  async addResponseForPostByPostId(postId:string, response: Response){
      const post = await this.getPostById(postId);

      if(!post){
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }
      post.responses.push(response);
      return await this.postRepository.updateResponses(post);
      // return await this.save(tmp);
  }

  async getPostBySubCategoryBetweenGrade(subCategories:number[], betweenObjectGrade:BetweenObjectGrade, userId: number){
    var postList;
    if(subCategories !== undefined){
      postList = await this.postRepository.getPostBySubCategoryBetweenGrade(subCategories, betweenObjectGrade, userId);
    }else{
      postList = await this.postRepository.getPostBetweenGrade(betweenObjectGrade, userId)
    }
    return postList.map(result => ({
      id: result.post_id,
      image: result.post_image,
      title: result.post_title,
      text: result.post_text,
      createdAt: new Date(result.post_createdAt),
      userName: result.userName,
      grade: result.post_grade,
      myLike: result.myLike === true ? true : (result.myLike === false ? false : null),
      responseCount: Number(result.responseCount),
      likeCount: Number(result.likeCount),
      disLikeCount: Number(result.disLikeCount),
    }));
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.getAllPosts();
  }

  async getPostById(id: string): Promise<Post> {
    const found = await this.postRepository.getPostById(id);
    if (!found) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const postToSend: PostToSend = {...found, userName: found.user.userName}
    return postToSend;
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const postToSave = await this.createPostToSave(createPostDto);
    return await this.postRepository.createPost(postToSave);
  }

  async createPostToSave(createPostDto:CreatePostDto):Promise<CreatePostToSave>{
    const user = new User();
    user.id = createPostDto.userId;

    const subCategory = new SubCategory();
    subCategory.id = createPostDto.subCategoryId;

    const grade =await  this.hugging.createGradeByHugging( createPostDto.title + createPostDto.title);

    const createPostToSave = {...createPostDto, grade, user, subCategory};
    
    return createPostToSave
  }

  async updatePost(id:string, updatePostDto: UpdatePostDto) {
    return await this.postRepository.updatePost(id, updatePostDto);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}