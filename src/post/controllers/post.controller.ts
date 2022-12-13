import { Controller, Get, Post } from '@nestjs/common';
import {
  Delete,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { PostService } from '../services/post.service';
import { CreatePostTypes, UpdatePostTypes } from '../type/post.types';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost() {
    return this.postService.getAllPost();
  }

  @Get()
  getPostById(@Param(':id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostTypes) {
    return this.postService.createPost(post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostTypes) {
    return this.postService.replacePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param(':id') id: string) {
    this.postService.deletePost(Number(id));
    return true;
  }
}
