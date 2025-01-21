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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import { UsersService } from './users.service';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
@ApiTags('用户管理')
@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createItem(@Body() createItemDto: CreateUserDto) {
    // 这里你可以确定dto是已经验证过的
    console.log(createItemDto);
    return this.userService.create(createItemDto);
    // throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
  }

  @ApiOperation({ summary: '用户列表' })
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
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
