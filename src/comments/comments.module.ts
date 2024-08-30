import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Photo])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
