import { Controller,UseGuards,HttpStatus,Post,HttpCode,Body,Get,Query,Param,Patch,Delete } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { QueryArticleDto } from './dto/query-article.dto';
import { Article } from './domain/article';
import { ArticlesService } from './articles.service';



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
    path: 'articles',
    version: '1',
  })
export class ArticlesController {
    constructor(private readonly articlesService:ArticlesService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
      return this.articlesService.create(createArticleDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() query: QueryArticleDto,
    ): Promise<InfinityPaginationResultType<Article>> {
    console.log(query);
    
      const page = query?.page ?? 1;
      let limit = query?.limit ?? 10;
      if (limit > 50) {
        limit = 50;
      }

      console.log(page,limit);
  
      return infinityPagination(
        await this.articlesService.findAll({
          paginationOptions: {
            page,
            limit,
          },
        }),
        { page, limit },
      );
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
     })
    findOne(@Param('id') id: Article['id']): Promise<NullableType<Article>> {
        return this.articlesService.findOne({ id });
    }
 
      @Patch(':id')
      @HttpCode(HttpStatus.OK)
      @ApiParam({
        name: 'id',
        type: String,
        required: true,
      })
      update(
        @Param('id') id: Article['id'],
        @Body() updateArticleDto: UpdateArticleDto,
      ): Promise<Article | null> {
        return this.articlesService.update(id, updateArticleDto);
      }
    
      @Delete(':id')
      @ApiParam({
        name: 'id',
        type: String,
        required: true,
      })
      @HttpCode(HttpStatus.NO_CONTENT)
      remove(@Param('id') id: Article['id']): Promise<void> {
        return this.articlesService.softDelete(id);
      }
}
