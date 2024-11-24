import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/posts/posts.dto';
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

  async createPost(body: CreatePostDto) {
    const post = this.postsRepository.create(body);

    return await this.postsRepository.save(post);
  }
}
