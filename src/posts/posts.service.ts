import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, PatchPostDto } from 'src/posts/posts.dto';
import { PostsModel } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async getCertainPost(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    return post;
  }

  async createPost(body: CreatePostDto) {
    const post = this.postsRepository.create(body);

    return await this.postsRepository.save(post);
  }

  async patchPost(id: number, body: PatchPostDto) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new BadRequestException('요청한 ID의 포스트가 없습니다.');
    }

    const newPost = this.postsRepository.create({
      ...post,
      ...body,
    });

    return await this.postsRepository.save(newPost);
  }

  async deletePost(id: number) {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new BadRequestException('요청한 ID의 포스트가 없습니다.');
    }

    return true;
  }
}
