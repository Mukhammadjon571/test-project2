import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';
import { User } from 'src/users/domain/user';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string | null;

    
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty({ required: false })
  @IsOptional()
  postDate?: Date;
}
