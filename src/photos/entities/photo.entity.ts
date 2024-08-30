import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comments/entities/comment.entity";

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.photo_id)
  comments: Comment[];
}
