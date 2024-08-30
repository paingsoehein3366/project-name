import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) { }

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.photosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(parseInt(id), updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(parseInt(id));
  }
}
