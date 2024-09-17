import { Module } from '@nestjs/common';
import { LikesModule } from './modules/like/likes.module';
import DatabaseModule from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
