import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './App/app.module';
import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  await app.listen(PORT);
  console.log(chalk.white(`http://localhost:${PORT}`));
}
bootstrap();
