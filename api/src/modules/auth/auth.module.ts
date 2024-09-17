import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [JwtModule, ConfigModule, PassportModule],
  providers: [JwtAccessStrategy],
  exports: [JwtAccessStrategy, JwtModule, ConfigModule, PassportModule],
})
export class AuthModule {}
