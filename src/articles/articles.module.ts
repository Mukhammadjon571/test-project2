import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersModule } from 'src/users/users.module';
import { RelationalArticlePersistenceModule } from './infrastructure/persistance/relational/relational-persistence.module';

@Module({
  imports:[RelationalArticlePersistenceModule,UsersModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
  exports:[ArticlesService,RelationalArticlePersistenceModule]
})
export class ArticlesModule {}
