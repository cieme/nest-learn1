import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'mysql'),
    MongooseModule.forFeature(
      [{ name: 'pmg_user', schema: UserSchema, collection: 'pmg_user' }],
      'mongodb',
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
