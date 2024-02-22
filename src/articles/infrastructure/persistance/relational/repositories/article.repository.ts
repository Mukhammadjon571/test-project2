import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../../article.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "../entities/article.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { Article } from "src/articles/domain/article";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { ArticleMapper } from "../mappers/article.mapper";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { NullableType } from "src/utils/types/nullable.type";


@Injectable()
export class ArticalRelationalRepository implements ArticleRepository {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articlesRepository:Repository<ArticleEntity>
    ){}

    findAll({ paginationOptions }: { paginationOptions: IPaginationOptions; }): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }

    async create(data: Article): Promise<Article> {
        const persistenceModel = ArticleMapper.toPersistence(data);
        const newEntity = await this.articlesRepository.save(
          this.articlesRepository.create(persistenceModel),
        );
        return ArticleMapper.toDomain(newEntity);
      }
    
      async findManyWithPagination({
        paginationOptions,
      }: {
        paginationOptions: IPaginationOptions;
      }): Promise<Article[]> {
        const where: FindOptionsWhere<ArticleEntity> = {};
    
        const entities = await this.articlesRepository.find({
          skip: (paginationOptions.page - 1) * paginationOptions.limit,
          take: paginationOptions.limit,
          where: where,
        });
    
        return entities.map((article) => ArticleMapper.toDomain(article));
      }
    
    
    
      async findOne(fields: EntityCondition<Article>): Promise<NullableType<Article>> {
        const entity = await this.articlesRepository.findOne({
          where: fields as FindOptionsWhere<ArticleEntity>,
        });
    
        return entity ? ArticleMapper.toDomain(entity) : null;
      }
    
      async update(id: Article['id'], payload: Partial<Article>): Promise<Article> {
        const entity = await this.articlesRepository.findOne({
          where: { id: Number(id) },
        });
    
        if (!entity) {
          throw new Error('User not found');
        }
    
        const updatedEntity = await this.articlesRepository.save(
          this.articlesRepository.create(
            ArticleMapper.toPersistence({
              ...ArticleMapper.toDomain(entity),
              ...payload,
            }),
          ),
        );
    
        return ArticleMapper.toDomain(updatedEntity);
      }
    
      async softDelete(id: Article['id']): Promise<void> {
        await this.articlesRepository.softDelete(id);
      }
}