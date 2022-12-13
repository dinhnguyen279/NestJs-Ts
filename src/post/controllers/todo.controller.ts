import {
  Controller,
  Get,
  HttpCode,
  Post,
  //   Query,
  //   Redirect,
} from '@nestjs/common';
import {
  Delete,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { PostService } from '../services/todo.service';
// import {
//   CreatePostTypes,
//   UpdatePostTypes,
//   //   ListAllEntities,
// } from '../dto/post.dto';
import {
  CreateTodoTypes,
  UpdateTodoTypes,
  // ListAllEntities,
} from '../dto/todo.dto';
@Controller('todo')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() todo: CreateTodoTypes) {
    console.log('done create post');

    return this.postService.createPost(todo);
  }

  @Get()
  getAllPost() {
    console.log('done find all data');
    return this.postService.getAllPost();
  }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() params) {
    console.log('id post', params.id);
    return this.postService.getPostById(Number(params.id));
  }

  @Put(':id')
  async replacePost(@Param() params, @Body() post: UpdateTodoTypes) {
    console.log('done put data', params.id);
    return this.postService.replacePost(Number(params.id), post);
  }

  @Delete(':id')
  async deletePost(@Param() params) {
    this.postService.deletePost(Number(params.id));
    console.log('done delete data', params.id);
    return true;
  }
}
