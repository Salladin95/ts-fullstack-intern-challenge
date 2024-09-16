import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AddLikeDto } from './likes.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() addLikeDto: AddLikeDto) {
    return this.likeService.add(addLikeDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (!id) throw new BadRequestException('id not found');
    return this.likeService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!id) throw new BadRequestException('id not found');
    return this.likeService.remove(id);
  }
}
