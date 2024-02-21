import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';


export class CreateArticleDto {
    
}
