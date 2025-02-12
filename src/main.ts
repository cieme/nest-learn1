import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './App/app.module';
import { globalMiddleware } from '@/common/middlewares/globalMiddleware/global.middleware';
import * as chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyOptions = {
  pathFilter: '/simulation',
  target: 'http://192.168.20.72', // 代理 ip
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '/simulation': '/simulation',
  },
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  const PREFIX = `api`;
  app.setGlobalPrefix(PREFIX);
  app.use(cors());
  // 后设置 swagger,这样调试才可以
  const options = new DocumentBuilder()
    .setTitle('测试文档')
    .setDescription(
      'Background system based on Nest.js + Vue3 full stack development',
    )
    .setVersion('1.0.x')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  app.use(createProxyMiddleware(proxyOptions));
  app.use(globalMiddleware);
  await app.listen(PORT);
  console.log(chalk.white(`http://localhost:${PORT}/${PREFIX}`));
}
bootstrap();
