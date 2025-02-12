import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMongoUserDto {
  @ApiProperty({ description: '名称', required: true })
  @IsString()
  name: string;

  @ApiProperty({ description: '年龄', required: true })
  @IsNumber()
  @Transform(({ value }) => Number(value)) //强制把字符转数字
  age: number;
}
