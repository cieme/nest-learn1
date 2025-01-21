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
  /**
   * 查所有人
   * @returns
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
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
  findActiveUsers(): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        isActive: 1,
      },
      skip: 10, // skip
      take: 10,
    });
  }
}
