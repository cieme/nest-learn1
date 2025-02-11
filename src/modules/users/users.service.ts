import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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
    return newUser.save();
  }
  /**
   * 查所有人,只查两个字段
   * @returns
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ['id', 'age'] });
  }
  async findAllInMongoDb(): Promise<User[]> {
    return this.userModel.find({
      age: {
        $gte: 18,
      },
    });
    // return this.userModel.find({}).select(['age', 'name']).exec();
  }
  async findOneInMongoDb(id: number): Promise<User> {
    return this.userModel.findById(id).select(['age', 'name']).exec();
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
  async updateByIdMongo(userInstance: CreateUserDto) {
    const updateResult = await this.userModel
      .findByIdAndUpdate(
        userInstance.id,
        {
          name: userInstance.name,
        },
        { new: true }, // 返回更新后的数据,false 返回更新前的数据
      )
      .catch(() => {
        throw new NotFoundException(
          `User with ID ${userInstance.id} not found`,
        );
      });
    return updateResult;
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
  findActiveUsersMongo(isActive: 0 | 1 = 1): Promise<User[]> {
    return this.userModel
      .find({
        isActive,
      })
      .skip(1)
      .limit(10);
  }
  // 查找所有列表,条件是关键词,返回 数据，符合条数，和当前第几页
  async findList(keyWord: string) {
    const [data, count] = await this.usersRepository.findAndCount({
      where: { name: Like(`%${keyWord}%`) }, // 模糊查询
      order: { age: 'DESC' }, // 按 age 降序
      skip: 0, // 跳过多少条
      take: 10, // 每页条数
    });
    return {
      data: data,
      count: count,
      currentPage: 1, // 当前第几页
    };
  }
  async findListMongo(keyWord: string = '', page = 1, limit = 10) {
    // 查找总数
    const totalCount = await this.userModel.countDocuments({
      name: { $regex: keyWord, $options: 'i' }, // 模糊查询（名字包含 "John"）
    });

    // 查找当前页的数据
    const users = await this.userModel
      .find({
        name: { $regex: keyWord, $options: 'i' }, // 模糊查询
      })
      .skip((page - 1) * limit) // 跳过前面 (page-1)*pageSize 条记录
      .limit(limit); // 每页限制记录数

    // 计算总页数
    const totalPages = Math.ceil(totalCount / limit); // 计算总页数
    return {
      users,
      totalCount,
      totalPages,
      currentPage: page, // 当前第几页
    };
  }
}
