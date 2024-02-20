import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import configurations from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configurations.server.port, () => {
    console.log(`Server started on port ${configurations.server.port}`);
  });
}
bootstrap();
