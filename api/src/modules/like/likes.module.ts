import { Like } from './likes.entity';
import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [TypeOrmModule, LikesService],
})
export class LikesModule {}
