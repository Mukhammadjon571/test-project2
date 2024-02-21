import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsEmail
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { User } from '../domain/user';


export class SortUserDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof User;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryUserDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;


  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortUserDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortUserDto)
  sort?: SortUserDto[] | null;
}

export class QueryUserByEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string | null;
}