import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LikesModule } from './modules/like/likes.module';
import DatabaseModule from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import JwtConfig from './modules/config/jwt.config';

@Module({
  imports: [
    DatabaseModule,
    LikesModule,
    UserModule,
    AppModule,
    ConfigModule.forRoot({ load: [JwtConfig] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
