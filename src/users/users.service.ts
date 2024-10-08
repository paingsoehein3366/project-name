import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto) {
    const { username, email, password, city_id } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = this.userRepository.create({
      username,
      email,
      password,
      city_id,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(query) {
    const { city_id, limit, skip } = query;

    const [data, count] = await this.userRepository.findAndCount({
      take: limit,
      skip: skip,
      where: { city_id },
      relations: ['city', 'photos'],
    });

    return { data, count };
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['city', 'photos'],
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.userRepository.delete(user);
  }
}
