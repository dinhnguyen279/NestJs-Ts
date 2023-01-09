import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/toto.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  getTodo(
    @Param() id: FindOptionsWhere<Todo> | FindOptionsWhere<Todo>[],
  ): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  createTodo(@Body() todo: Todo) {
    return this.todoService.createTodo(todo);
  }

  // @Put(':id')
  // updateTodo(@Param('id') id: string): Promise<Todo> {
  //   return this.todoService.update(id);
  // }

  @Put()
  updateTodo(@Body() todo: Todo) {
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
