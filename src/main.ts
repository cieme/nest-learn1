import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './App/app.module';

import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');

  const options = new DocumentBuilder()
    .setTitle('CMS接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT);
  console.log(chalk.white(`http://localhost:${PORT}`));
}
bootstrap();
