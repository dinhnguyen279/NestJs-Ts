import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostTypes } from '../interfaces/post.interface';
import { CreatePostTypes, UpdatePostTypes } from '../dto/post.dto';
// import { postApi } from '../../database/db';
@Injectable()
export class PostService {
  private lastPostId = 0;
  private dataPost: PostTypes[];

  findAll() {
    return this.dataPost;
  }

  getPostById(id: number) {
    const post = this.dataPost.find((post: PostTypes) => post.id === id);
    if (post) {
      return post;
    } else {
      throw new HttpException('Post not found!!!', HttpStatus.NOT_FOUND);
    }
  }

  createPost(post: CreatePostTypes) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    if (this.dataPost.findIndex((post) => post.id !== newPost.id)) {
      console.log('Trùng lặp id');
      return;
    }
    // this.dataPost.push(<PostTypes>newPost);
    return newPost;
  }

  replacePost(id: number, post: UpdatePostTypes) {
    const postIndex = this.dataPost.findIndex(
      (post: PostTypes) => post.id === id,
    );
    if (postIndex > 1) {
      this.dataPost[postIndex] = <PostTypes>post;
      return post;
    }
  }
  deletePost(id: number) {
    const postIndex = this.dataPost.findIndex(
      (post: PostTypes) => post.id === id,
    );
    if (postIndex > -1) {
      this.dataPost.slice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
