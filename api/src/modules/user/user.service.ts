import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTConfigEnum } from '../config/jwt.config';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(login: string): Promise<User | null> {
    const like = await this.userRepository.findOneBy({ login });
    if (!like) {
      throw new NotFoundException();
    }
    return like;
  }

  async create(dto: CreateUserDto): Promise<string | null | Error> {
    const user = this.userRepository.create(dto);
    try {
      await this.userRepository.save(user);
      const token = await this.getTokens({ login: user.login });
      return token;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async remove(login: string): Promise<void> {
    await this.findOne(login);
    await this.userRepository.delete(login);
  }

  async getTokens(payload: { login: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.config.get(JWTConfigEnum.SALT),
      expiresIn: '7d',
    });
  }
}
