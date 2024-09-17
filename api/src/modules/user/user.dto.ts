import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Invalid input' })
  login: string;

  @IsString()
  @MinLength(4, { message: 'Invalid input' })
  password: string;
}
