import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('user_id')
  user_id: number;

  @Column('photo_id')
  photo_id: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}
