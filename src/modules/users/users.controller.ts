import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  // HttpCode,
  // HttpStatus,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { UserDto } from './dto/create-user.dto';
@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createItem(@Body() createItemDto: UserDto) {
    // 这里你可以确定dto是已经验证过的
    console.log(createItemDto);
    return this.userService.create(createItemDto);
  }

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
