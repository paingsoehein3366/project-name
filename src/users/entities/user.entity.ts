import { City } from "src/cities/entities/city.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "src/comments/entities/comment.entity";
import { Photo } from "src/photos/entities/photo.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'city_id' })
  city_id: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city: City;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
