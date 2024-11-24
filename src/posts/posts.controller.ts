import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto, PatchPostDto } from 'src/posts/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: '모든 포스트를 불러옵니다.',
  })
  async getPosts() {
    return await this.postsService.getAllPosts();
  }

  @Post()
  @ApiOperation({
    summary: '요청한 정보를 바탕으로 포스트를 생성합니다.',
  })
  @ApiConsumes('application/x-xxx-form-urlencoded')
  @ApiBody({
    schema: {
      properties: {
        author: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
      },
    },
  })
  async postPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '요청한 ID의 포스트 데이터를 수정합니다.',
  })
  async patchPost(@Param('id', ParseIntPipe) id: number, @Body() body: PatchPostDto) {
    return await this.postsService.patchPost(id, body);
  }
}
