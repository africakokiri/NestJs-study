import { BaseModel } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PostsModel extends BaseModel {
  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    default: 0,
  })
  likeCount: number;

  @Column({
    default: 0,
  })
  commentCount: number;
}
