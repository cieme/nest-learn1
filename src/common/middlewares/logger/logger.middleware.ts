import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const number = Math.random() * 100;
    if (number < 50) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } else {
      next();
    }
  }
}
