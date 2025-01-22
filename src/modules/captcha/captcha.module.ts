import { Module } from '@nestjs/common';
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
export class CaptchaModule {}
