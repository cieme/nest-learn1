import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
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
  findActiveUsers() {
    return this.userService.findActiveUsers();
  }
}
