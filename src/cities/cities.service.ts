import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>,
  ) { }
  async create(createCityDto: CreateCityDto) {
    const { name } = createCityDto;
    const filteredCity = await this.citiesRepository.findOne({ where: { name } });
    if (filteredCity) {
      throw new BadRequestException(`${name} already exists`);
    }
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  findAll() {
    return this.citiesRepository.find();
  }

  findOne(id: number) {
    return this.citiesRepository.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<City>) {
    const City = await this.findOne(id);
    if (!City) {
      throw new NotFoundException(`City is not found`);
    }
    Object.assign(City, attrs);
    return await this.citiesRepository.save(City);
  }

  async remove(id: number) {
    const City = await this.findOne(id);
    if (!City) {
      throw new NotFoundException(`City is not found`);
    }
    return await this.citiesRepository.remove(City);
  }
}
