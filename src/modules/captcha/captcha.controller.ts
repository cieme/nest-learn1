import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
@UseInterceptors(TransformInterceptor)
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Post('create')
  create() {
    return this.captchaService.create();
  }
  @Post('validate')
  async validateCaptcha(
    @Body('sessionId') sessionId: string,
    @Body('input') input: string,
  ) {
    const isValid = await this.captchaService.validateCaptcha(sessionId, input);
    if (isValid) {
      return isValid;
    } else {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }
}
