import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Like } from '../like/likes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig, { PostgresConfigEnum } from '../config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(PostgresConfigEnum.HOST),
        port: configService.get(PostgresConfigEnum.PORT),
        username: configService.get(PostgresConfigEnum.USER),
        password: configService.get(PostgresConfigEnum.PASSWORD),
        database: configService.get(PostgresConfigEnum.DB),
        entities: [Like, User],
        synchronize: true,
      }),
    }),
  ],
})
export default class DatabaseModule {}
