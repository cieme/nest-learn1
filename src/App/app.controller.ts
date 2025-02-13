import { Controller, Get, Inject, Post, Headers, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  @Inject('AppService')
  private readonly appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  GTest(): string {
    return 'get' + this.appService.test();
  }

  @Post('/test')
  PTest(@Headers() header: Headers, @Body() body: Body): any {
    console.log(body);
    return {
      text: 'post' + this.appService.test(),
      header,
    };
  }
}
