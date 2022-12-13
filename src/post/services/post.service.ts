import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from '../post.interface';
import { CreatePostTypes, UpdatePostTypes } from '../type/post.types';

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];
  getAllPost() {
    return this.posts;
  }
  getPostById(id: number) {
    const post = this.posts.find((post: Post) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  createPost(post: CreatePostTypes) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };
    this.posts.push(<Post>newPost);
    return newPost;
  }
  replacePost(id: number, post: UpdatePostTypes) {
    const postIndex = this.posts.findIndex((post: Post) => post.id === id);
    if (postIndex > 1) {
      this.posts[postIndex] = <Post>post;
      return post;
    }
  }
  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post: Post) => post.id === id);
    if (postIndex > -1) {
      this.posts.slice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
