import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/persistance/article.repository';
import { UsersService } from 'src/users/users.service';
import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import {IPaginationOptions} from "src/utils/types/pagination-options";

@Injectable()
export class ArticlesService {
    constructor(
        private readonly articlesRepository:ArticleRepository,
        private readonly usersService:UsersService
    ){}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const clonedPayload = {
          ...createArticleDto,
        };

        
        
        return this.articlesRepository.create(clonedPayload);
      }
    
      findAll({
        paginationOptions,
      }: {
        paginationOptions: IPaginationOptions;
      }): Promise<Article[]> {
        console.log("page",paginationOptions);
        return this.articlesRepository.findAll({
          paginationOptions,
        });
      }
    
      findOne(fields: EntityCondition<Article>): Promise<NullableType<Article>> {
        return this.articlesRepository.findOne(fields);
      }
    
      async update(
        id: Article['id'],
        payload: DeepPartial<Article>,
      ): Promise<Article | null> {
        const clonedPayload = { ...payload };

        return this.articlesRepository.update(id, clonedPayload);
      }
    
      async softDelete(id: Article['id']): Promise<void> {
        await this.articlesRepository.softDelete(id);
      }
}

