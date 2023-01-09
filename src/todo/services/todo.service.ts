import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, FindOptionsWhere } from 'typeorm';
import { CreateTodo } from '../dto/todo.dto';
// import { TodoTypes } from '../dto/todo.dto';
import { Todo } from '../models/toto.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    console.log('find all todo');
    return await this.todoRepo.find();
  }

  async findOne(
    id: FindOptionsWhere<Todo> | FindOptionsWhere<Todo>[],
  ): Promise<Todo> {
    console.log('find one: ', id);
    return await this.todoRepo.findOneBy(id);
  }

  async createTodo(CreateTodo: CreateTodo): Promise<Todo> {
    console.log('Create Todo', CreateTodo);
    return await this.todoRepo.save(CreateTodo);
  }

  // async update(todo: Todo): Promise<UpdateResult> {
  //   console.log('update Todo', todo);
  //   return await this.todoRepo.update(todo.id, todo);
  // }

  async update(todo: Todo): Promise<UpdateResult> {
    console.log('update Todo', todo);
    return await this.todoRepo.update(todo.id, todo);
  }

  async remove(id: string): Promise<void> {
    console.log('delete', id);
    await this.todoRepo.delete(id);
  }
}
