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
  Put,
  Patch,
  // HttpCode,
  // HttpStatus,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import { UsersService } from './users.service';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
// UsePipes 管道
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
  @Post('/create-mongo')
  async createUserInMongoDB(
    @Body('name') name: string,
    @Body('age') age: string,
  ) {
    return await this.userService.createUserInMongoDB(name, age);
  }
  @ApiOperation({ summary: '用户列表' })
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  @Get('/findAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/findAllInMongoDb')
  findAllInMongoDb() {
    return this.userService.findAllInMongoDb();
  }

  @Get('/findUserById/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('/findUserByIdMongoDb')
  @UsePipes(new ValidationPipe({ transform: true }))
  findUserByIdMongoDb(@Body() search: FindUserDto) {
    return this.userService.findOneInMongoDb(search.id);
  }

  @Get('/findActiveUsers')
  findActiveUsers(@Query('isActive') isActive: 0 | 1) {
    return this.userService.findActiveUsers(isActive);
  }
  @Get('/findActiveUsersMongo')
  findActiveUsersMongo(@Query('isActive') isActive: 0 | 1) {
    return this.userService.findActiveUsersMongo(isActive);
  }

  @Put('update')
  updateUser(@Body() createItemDto: CreateUserDto) {
    return this.userService.update(createItemDto);
  }
  @Put('updateMongo')
  updateUserByIdMongo(@Body() createItemDto: CreateUserDto) {
    return this.userService.updateByIdMongo(createItemDto);
  }
  @Patch('patch')
  patchUser(@Body() createItemDto: CreateUserDto) {
    return this.userService.patch(createItemDto);
  }
  @Get('findList')
  findList(@Body() search: { keyWord: string }) {
    // {"name":"李"}
    return this.userService.findList(search.keyWord);
  }
  @Get('findListMongo')
  findListMongo(
    @Body() search: { keyWord: string; page: number; limit: number },
  ) {
    return this.userService.findListMongo(
      search.keyWord,
      search.page,
      search.limit,
    );
  }
}
