import { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  id: number;
  name: string;
  isActive: number;
  age: number;
  other: any;
}

export const UserSchema = new Schema<UserDocument>({
  id: {
    type: Number,
    unique: true,
    required: false,
    index: true, // 创建一个索引，提高查询速度
    autoIncrement: true, // 自增
  },
  name: { type: String, required: true },
  isActive: { type: Number, default: 1 },
  age: { type: Number, default: 1 },
  other: { type: Object }, // 其他属性
});
