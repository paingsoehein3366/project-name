import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const { text, user_id, photo_id } = createCommentDto;
    const user = await this.usersRepository.findOne({ where: { id: user_id } });
    const photo = await this.photosRepository.findOne({ where: { id: photo_id } });

    if (!user || !photo) {
      throw new NotFoundException('User or photo not found');
    }
    const comment = this.commentsRepository.create({ text, user_id, photo_id });
    return this.commentsRepository.save(comment);
  }

  async findAll(query) {
    const { limit, skip, search } = query;
    let where: any;
    if (search) {
      where = { description: search };
    }
    const [data, count] = await this.commentsRepository.findAndCount({
      take: limit,
      skip: skip,
      where,
    });
    return { data, count };
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: number, attrs: Partial<Comment>) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    Object.assign(comment, attrs);
    return this.commentsRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.commentsRepository.remove(comment);
  }
}
