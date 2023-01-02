import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoTypes } from '../interfaces/todo.interface';
import { CreateTodoTypes, UpdateTodoTypes } from '../dto/todo.dto';
import { todoApi } from '../../database/db';
@Injectable()
export class TodoService {
  private lastPostId = 0;
  private dataTodo: TodoTypes[] = todoApi;

  getAllPost() {
    return this.dataTodo;
  }

  getPostById(id: number) {
    const post = this.dataTodo.find((todo: TodoTypes) => todo.id === id);
    if (post) {
      return post;
    } else {
      throw new HttpException('Post not found!!!', HttpStatus.NOT_FOUND);
    }
  }

  createPost(todo: CreateTodoTypes) {
    const newPost = {
      id: ++this.lastPostId,
      ...todo,
    };
    if (this.dataTodo.findIndex((todo) => todo.id !== newPost.id)) {
      console.log('Trùng lặp id');
      return;
    }
    this.dataTodo.push(<TodoTypes>newPost);
    return newPost;
  }

  replacePost(id: number, todo: UpdateTodoTypes) {
    const postIndex = this.dataTodo.findIndex(
      (todo: TodoTypes) => todo.id === id,
    );
    if (postIndex > 1) {
      this.dataTodo[postIndex] = <TodoTypes>todo;
      return todo;
    }
  }
  deletePost(id: number) {
    const postIndex = this.dataTodo.findIndex(
      (todo: TodoTypes) => todo.id === id,
    );
    if (postIndex > -1) {
      this.dataTodo.slice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
