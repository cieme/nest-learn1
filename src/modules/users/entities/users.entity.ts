import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user') // 指定数据库中的表名是 'user'
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '用户名',
  })
  name: string;

  @Column({ default: 1 })
  isActive: number;

  @Column({ type: 'int' })
  age: number;
}
