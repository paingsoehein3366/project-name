
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
  ) { }

  create(createPhotoDto: CreatePhotoDto) {
    const { url, description, user_id } = createPhotoDto;

    const photo = this.photosRepository.create({ url, description, user_id });
    return this.photosRepository.save(photo);
  }

  async findAll(query) {
    const { limit, skip, search } = query;
    let where: FindOptionsWhere<Photo>[] | FindOptionsWhere<Photo>;
    if (search) {
      where = { description: ILike(`%${search}%`) };
    }
    const [data, count] = await this.photosRepository.findAndCount({
      take: limit,
      skip: skip,
      where,
      // relations: ['comments']
    });
    return { data, count };
  }

  async findOne(id: number) {
    const photo = await this.photosRepository.findOne({ where: { id } });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async update(id: number, attrs: Partial<Photo>) {
    const photo = await this.findOne(id);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    Object.assign(photo, attrs);
    return await this.photosRepository.save(photo);
  }

  async remove(id: number) {
    const photo = await this.findOne(id);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return await this.photosRepository.remove(photo);
  }
}
