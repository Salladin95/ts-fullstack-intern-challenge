import { Repository } from 'typeorm';
import { Like } from './likes.entity';
import { AddLikeDto } from './likes.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  findAll(): Promise<Like[]> {
    return this.likeRepository.find();
  }

  async findOne(id: string): Promise<Like | null> {
    const like = await this.likeRepository.findOneBy({ cat_id: id });
    if (!like) {
      throw new NotFoundException();
    }
    return like;
  }

  async add(dto: AddLikeDto): Promise<Like | null> {
    const like = this.likeRepository.create(dto);
    return this.likeRepository.save(like);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.likeRepository.delete(id);
  }
}
