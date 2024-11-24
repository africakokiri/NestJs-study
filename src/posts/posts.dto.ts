import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PostsModel } from 'src/posts/posts.entity';

export class CreatePostDto extends PickType(PostsModel, ['author', 'title', 'content']) {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
