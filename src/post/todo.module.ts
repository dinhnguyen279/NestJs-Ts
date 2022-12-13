import { Module } from '@nestjs/common';
import { PostController } from './controllers/todo.controller';
import { PostService } from './services/todo.service';
@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
