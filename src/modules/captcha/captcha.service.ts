import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class CaptchaService {
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis(); // 默认连接到本地 Redis
  }
  async create() {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 3,
      color: true,
      width: 500,
      height: 30,
      background: '#f5f5f5',
      fontSize: 28,
      ignoreChars: '0o1il', // 忽略的字符
    });
    const sessionId = 'captcha_' + Date.now(); // 随机生成 session id
    // 存储到 Redis，设置 5 分钟过期时间
    await this.redisClient.set(sessionId, captcha.text, 'EX', 5 * 60);

    return { data: captcha.data, id: sessionId };
  }
  async validateCaptcha(sessionId: string, input: string): Promise<boolean> {
    const storedCaptcha = await this.redisClient.get(sessionId);

    if (!storedCaptcha) {
      return false; // 验证码不存在或已过期
    }

    const isValid = storedCaptcha.toLowerCase() === input.toLowerCase();
    if (isValid) {
      await this.redisClient.del(sessionId); // 验证成功后删除验证码
    }
    return isValid;
  }
}
