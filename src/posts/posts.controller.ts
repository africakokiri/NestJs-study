import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: '모든 포스트를 불러온다.',
  })
  async getPosts() {
    return await this.postsService.getAllPosts();
  }
}
