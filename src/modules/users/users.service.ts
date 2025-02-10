import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'mysql')
    private usersRepository: Repository<User>,
    @InjectModel('pmg_user', 'mongodb')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userInstance) {
    const user = await this.usersRepository.create(userInstance);
    return this.usersRepository.save(user);
  }
  async createUserInMongoDB(name: string, age: string): Promise<UserDocument> {
    const newUser = new this.userModel({ name, age });
    console.log(newUser);
    return newUser.save();
  }
  /**
   * 查所有人,只查两个字段
   * @returns
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ['id', 'age'] });
  }

  /**
   *
   * @param id 找某人
   * @returns
   */
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }
  async update(userInstance: CreateUserDto) {
    const user = await this.usersRepository.preload({
      id: userInstance.id, // 主键
      ...userInstance,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userInstance.id} not found`);
    }

    return this.usersRepository.findOne({ where: { id: userInstance.id } });
    // return this.usersRepository.save(user); // 保存后返回更新后的数据
  }
  async patch(userInstance: CreateUserDto) {
    const updateResult = await this.usersRepository.update(userInstance.id, {
      name: userInstance.name,
    });
    // 2. 检查是否有更新（受影响的行数）
    if (updateResult.affected === 0) {
      throw new NotFoundException(`User with ID ${userInstance.id} not found`);
    }
    return this.usersRepository.findOne({ where: { id: userInstance.id } });
  }
  /**
   * 分页查询
   * @returns
   */
  findActiveUsers(isActive: 0 | 1): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        isActive,
      },
      select: ['id', 'age', 'isActive'],
      skip: 1, // 跳过一条
      take: 10, // 查十条
    });
  }
}
