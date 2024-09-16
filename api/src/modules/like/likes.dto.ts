import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddLikeDto {
  @IsString()
  @IsNotEmpty({ message: 'cat_id must be a non-empty string' })
  cat_id: string;

  @IsOptional()
  @IsString()
  created_at: string;
}
