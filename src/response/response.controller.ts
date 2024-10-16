import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from './response.entity';
import {
  CreateResponseDto,
  CreateResponseToResponse,
  UpdateResponseDto,
} from './response.type';
import { Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('response')
export class ResponseController {
  constructor(private responseService: ResponseService) {}
  @Get('/responseByPostId')
  async getResponsesByPostId(
    @Query('postId') postId: string,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return await this.responseService.getResponsesByPostId(postId, userId);
  }

  @Get('/responseByResponseId')
  async getResponseToResponse(
    @Query('responseId') responseId: string,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return await this.responseService.getResponseToResponse(responseId, userId);
  }

  @Get()
  async getAllResponses(): Promise<Response[]> {
    return await this.responseService.getAllResponses();
  }

  @Get('/:id')
  async getResponseById(@Param('id') id: string): Promise<Response> {
    return await this.responseService.getResponseById(id);
  }

  @Post('/createResponseToPost')
  async createResponse(@Body() createResponseDto: CreateResponseDto) {
    return await this.responseService.createResponseToPost(createResponseDto);
  }

  @Post('/createResponseToResponse')
  async createResponseToResponse(
    @Body() createResponseToResponse: CreateResponseToResponse,
  ) {
    return await this.responseService.createResponseToRespose(
      createResponseToResponse,
    );
  }

  @Patch('/:id')
  async updateResponse(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    return await this.responseService.updateResponse(id, updateResponseDto);
  }

  @Delete('/:id')
  async deleteResponse(@Param('id') id: string) {
    return await this.responseService.deleteResponse(id);
  }
}
