import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { username, email, password, city_id } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('city_id:', city_id);

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
    const { city_id } = query;

    const [data, count] = await this.userRepository.findAndCount(city_id);
    console.log('data:', data);

    return { data, count };
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
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
