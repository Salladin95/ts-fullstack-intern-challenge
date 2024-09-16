import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './modules/config/app.config';
import { LikesModule } from './modules/like/likes.module';
import DatabaseModule from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    DatabaseModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
