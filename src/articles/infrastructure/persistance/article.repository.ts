import { NullableType } from '../../../utils/types/nullable.type';
import { Article } from 'src/articles/domain/article';
import { User } from 'src/users/domain/user';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';


export abstract class ArticleRepository {
  abstract findOne(
    options: EntityCondition<Article>,
  ): Promise<NullableType<Article>>;

  abstract findAll({
    paginationOptions
  }:{
    paginationOptions: IPaginationOptions;
  }):Promise<Article[]>

  abstract create(
    data: Omit<Article, 'id' | 'createdAt' | 'isActive' |"updatedAt">,
  ): Promise<Article>;

  abstract softDelete(id: Article['id']): Promise<void>;

  abstract update(
    id: Article['id'],
    payload: DeepPartial<Article>,
  ): Promise<Article | null>;
}
