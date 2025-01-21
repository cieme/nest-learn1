import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/findAllUsers')
  findAll() {
    return this.userService.findAll();
  }
  @Get('/findUserById/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Get('/findActiveUsers')
  findActiveUsers(@Query('isActive') isActive: 0 | 1) {
    return this.userService.findActiveUsers(isActive);
  }
}
