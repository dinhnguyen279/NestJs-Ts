import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoTypes } from '../interfaces/todo.interface';
import { CreateTodoTypes, UpdateTodoTypes } from '../dto/todo.dto';
import { todoApi } from '../../database/db';
@Injectable()
export class PostService {
  private lastPostId = 0;
  private dataTodo: TodoTypes[] = todoApi;

  getAllPost() {
    return this.dataTodo;
  }

  getPostById(id: number) {
    const post = this.dataTodo.find((post: TodoTypes) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found!!!', HttpStatus.NOT_FOUND);
  }

  createPost(post: CreateTodoTypes) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    this.dataTodo.push(<TodoTypes>newPost);
    return newPost;
  }

  replacePost(id: number, post: UpdateTodoTypes) {
    const postIndex = this.dataTodo.findIndex(
      (post: TodoTypes) => post.id === id,
    );
    if (postIndex > 1) {
      this.dataTodo[postIndex] = <TodoTypes>post;
      return post;
    }
  }
  deletePost(id: number) {
    const postIndex = this.dataTodo.findIndex(
      (post: TodoTypes) => post.id === id,
    );
    if (postIndex > -1) {
      this.dataTodo.slice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
