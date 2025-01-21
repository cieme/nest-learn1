import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userInstance) {
    const user = await this.usersRepository.create(userInstance);
    return this.usersRepository.save(user);
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
