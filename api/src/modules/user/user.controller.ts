import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { AccessAuthGuard } from '../../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AccessAuthGuard)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AccessAuthGuard)
  @Get(':login')
  @HttpCode(200)
  findOne(@Param('login') login: string) {
    if (!login) throw new BadRequestException('login not found');
    return this.userService.findOne(login);
  }

  @UseGuards(AccessAuthGuard)
  @Delete(':login')
  @HttpCode(204)
  remove(@Param('login') login: string) {
    if (!login) throw new BadRequestException('login not found');
    return this.userService.remove(login);
  }
}
