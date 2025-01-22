import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from '@/common/middlewares/logger/logger.middleware';

import { CaptchaService } from './captcha.service';
import { CaptchaService2 } from './captcha.service2';
import { CaptchaController } from './captcha.controller';

@Module({
  controllers: [CaptchaController],
  providers: [
    {
      provide: 'CaptchaServiceAlias',
      useClass: CaptchaService,
    },
    {
      provide: 'AppCode',
      useValue: ['TB', 'JD'],
    },
    CaptchaService2,
    {
      provide: 'AppInfo',
      inject: [CaptchaService2],
      async useFactory(CaptchaService2: CaptchaService2) {
        console.log(CaptchaService2.hello());
        return '123';
      },
    },
  ],
})
export class CaptchaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('captcha/validateCaptcha')
      .forRoutes({ path: '/captcha/create', method: RequestMethod.ALL });
    // consumer.apply(LoggerMiddleware).forRoutes(CaptchaController);
    // consumer.apply(LoggerMiddleware).forRoutes('captcha');
  }
}
