import {
  IsString,
  IsNumber,
  Min,
  IsIn,
  IsOptional,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { User } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends User {
  @ApiProperty({ description: '唯一ID', required: false })
  @Transform(({ value }) => Number(value)) //强制把字符转数字
  @IsNumber() //必须是数字
  @Min(1) // 最小是1
  @IsOptional() //可选项，这个参数可以不发或者为空
  readonly id: number; // id是参数名

  @ApiProperty({ description: '名称', required: true })
  @IsString() //必须是字符
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    description: '状态',
    required: false,
    examples: [0, 1],
  })
  @IsIn([0, 1])
  @IsOptional() //可选项，这个参数可以不发或者为空
  readonly isActive: 0 | 1;

  @IsNumber()
  @Min(18)
  readonly age: number;
}
// 指定对象格式
export class UserFormDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  readonly userForm: CreateUserDto;
}
