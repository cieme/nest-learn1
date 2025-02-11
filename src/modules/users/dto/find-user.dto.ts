import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto extends User {
  @ApiProperty({ description: '唯一ID', required: true, type: 'integer' })
  @Transform(({ value }) => Number(value)) //强制把字符转数字
  @IsNumber() //必须是数字
  readonly id: number; // id是参数名
}
