import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/domain/user';


export class CreateArticleDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ required: false })
    description: string | null;
  
    @ApiProperty()
    @IsNotEmpty()
    user: User;
  
    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    postDate: Date;
}
