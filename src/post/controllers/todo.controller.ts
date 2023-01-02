import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  Delete,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { TodoService } from '../services/todo.service';
import {
  CreateTodoTypes,
  UpdateTodoTypes,
  // ListAllEntities,
} from '../dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createPost(@Body() todo: CreateTodoTypes) {
    console.log('done create post');

    return this.todoService.createPost(todo);
  }

  @Get()
  getAllPost() {
    console.log('done find all data');
    return this.todoService.getAllPost();
  }

  @Get(':id')
  @HttpCode(200)
  getPostById(@Param() params) {
    console.log('id post', params.id);
    return this.todoService.getPostById(Number(params.id));
  }

  @Put(':id')
  async replacePost(@Param() params, @Body() post: UpdateTodoTypes) {
    console.log('done put data', params.id);
    return this.todoService.replacePost(Number(params.id), post);
  }

  @Delete(':id')
  async deletePost(@Param() params) {
    this.todoService.deletePost(Number(params.id));
    console.log('done delete data', params.id);
    return true;
  }
}
