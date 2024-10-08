import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseRepository } from './response.repository';
import { Response } from './response.entity';
import {
  basicResponse,
  CreateResponseDto,
  CreateResponseToResponse,
  CreateResponseToSave,
  ResponseToSend,
  UpdateResponseDto,
} from './response.type';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { HugginFaceService } from 'src/huggin-face/huggin-face.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(ResponseRepository)
    private responceRepository: ResponseRepository,
    private postService: PostService,
    private hugging: HugginFaceService,
  ) {}

  async getResponsesByPostId(postId: string, userId: number) {
    const responsesToPost = await this.responceRepository.getResponsesByPostId(postId, userId);
    return responsesToPost.map(result => ({
      id: result.response_id,
      createdAt: result.response_createdAt,
      description: result.response_description,
      grade: result.response_grade,
      userName: result.userName,
      myLike: result.myLike,
      responseCount: result.responseCount,
      likeCount: result.likeCount,
      disLikeCount: result.disLikeCount,
    }))
  }

  async getAllResponses(): Promise<Response[]> {
    return await this.responceRepository.getAllResponses();
  }

  async getResponseById(id: string): Promise<Response> {
    const response = await this.responceRepository.getResponseById(id);
    const responseToSend: ResponseToSend = {...response, userName: response.user.userName}
    return responseToSend;
  }

  async getResponseToResponse(responseId: string, userId: number){
    const responseToResponse = await this.responceRepository.getResponseToResponse(responseId, userId);
    return responseToResponse.map(result => ({
      id: result.response_id,
      createdAt: result.response_createdAt,
      description: result.response_description,
      grade: result.response_grade,
      responseTo:[],
      userName: result.userName,
      myLike: result.myLike,
      responseCount: result.responseCount,
      likeCount: result.likeCount,
      disLikeCount: result.disLikeCount,
    }))
  }

  async createResponseToPost(createResponseDto: CreateResponseDto) {
    const response = await this.saveResponseInDB(createResponseDto);
    return this.postService.addResponseForPostByPostId(
      createResponseDto.postId,
      response,
    );
  }

  async createResponseToRespose(
    createResponseToResponse: CreateResponseToResponse,
  ) {
    const response = await this.saveResponseInDB(createResponseToResponse);
    return this.createResponseToResponse(
      createResponseToResponse.responseId,
      response,
    );
  }

  async createResponseToResponse(
    responseId: string,
    createResponseToResponse: Response,
  ) {
    const response = await this.responceRepository.getResponseById(responseId);

    if (!response) {
      throw new NotFoundException(`Response with ID ${responseId} not found`);
    }

    response.responseTo.push(createResponseToResponse);
    response.haveAResponse = true;
    return await this.responceRepository.saveNewResponeList(response);
  }

  async saveResponseInDB(createResponseDto: basicResponse) {
    const responseToSave = await this.createResponseToSave(createResponseDto);
    return await this.responceRepository.createResponse(responseToSave);
  }

  async createResponseToSave(
    createResponseDto: basicResponse,
  ): Promise<CreateResponseToSave> {
    const grade = await this.hugging.createGradeByHugging(createResponseDto.description);

    const user = new User();
    user.id = createResponseDto.userId;
    const responseToSave: CreateResponseToSave = {
      ...createResponseDto,
      user,
      grade,
      haveAResponse: false,
    };

    return responseToSave;
  }

  async updateResponse(id: string, updateResponseDto: UpdateResponseDto) {
    return await this.responceRepository.updateResponse(id, updateResponseDto);
  }

  async deleteResponse(id: string) {
    return await this.responceRepository.deleteResponse(id);
  }
}
