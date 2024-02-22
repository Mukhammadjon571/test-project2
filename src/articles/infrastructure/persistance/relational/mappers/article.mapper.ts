import { Article } from "src/articles/domain/article";
import { ArticleEntity } from '../entities/article.entity';
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";

export class ArticleMapper {
  static toDomain(raw: ArticleEntity): Article {
    const article = new Article();
    article.id = raw.id;
    article.name = raw.name;
    article.description = raw.description;
    article.user = raw.user;
    article.createdAt = raw.createdAt;
    article.updatedAt = raw.updatedAt;
    article.isActive = raw.isActive;

    return article;
  }

  static toPersistence(article: Article): ArticleEntity {
    const articleEntity = new ArticleEntity();
    if (article.id && typeof article.id === 'number') {
      articleEntity.id = article.id;
    }
    articleEntity.name = article.name;
    articleEntity.description = article.name;
    articleEntity.userEntity = UserEntity.toPersistence(article.user);
    articleEntity.postDate = article.postDate;
    articleEntity.createdAt = article.createdAt;
    articleEntity.updatedAt = article.updatedAt;
    articleEntity.isActive =article.isActive;
    return articleEntity;
  }
}
