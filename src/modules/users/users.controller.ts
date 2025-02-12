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
import { CreateMongoUserDto } from './dto/create-mongo.dot';
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

  @ApiOperation({ summary: '用户列表' })
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  @Get('/findAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findList')
  findList(@Body() search: { keyWord: string }) {
    // {"name":"李"}
    return this.userService.findList(search.keyWord);
  }

  @Get('/findUserById/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('/findActiveUsers')
  findActiveUsers(@Query('isActive') isActive: 0 | 1) {
    return this.userService.findActiveUsers(isActive);
  }

  @Put('update')
  updateUser(@Body() createItemDto: CreateUserDto) {
    return this.userService.update(createItemDto);
  }

  @Patch('patch')
  patchUser(@Body() createItemDto: CreateUserDto) {
    return this.userService.patch(createItemDto);
  }

  @Get('/findAllInMongoDb')
  findAllInMongoDb() {
    return this.userService.findAllInMongoDb();
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

  @Get('/findActiveUsersMongo')
  findActiveUsersMongo(@Query('isActive') isActive: 0 | 1) {
    return this.userService.findActiveUsersMongo(isActive);
  }

  @Get('/findOneInMongoDb')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOneInMongoDb(@Body() search: FindUserDto) {
    return this.userService.findOneInMongoDb(search.id);
  }
  @ApiOperation({ summary: '创建用户-mongo' })
  @Post('/create-mongo')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUserInMongoDB(@Body() body: CreateMongoUserDto) {
    return await this.userService.createUserInMongoDB(
      body.name,
      body.age,
      body,
    );
  }

  @Put('updateByIdMongo')
  updateUserByIdMongo(@Body() createItemDto: CreateUserDto) {
    return this.userService.updateByIdMongo(createItemDto);
  }
}
