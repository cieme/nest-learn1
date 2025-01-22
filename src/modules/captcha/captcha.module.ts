import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';

@Module({
  controllers: [CaptchaController],
  providers: [
    {
      provide: 'CaptchaServiceAlias',
      useClass: CaptchaService,
    },
  ],
})
export class CaptchaModule {}
