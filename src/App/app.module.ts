import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule, type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

import { AppService } from './app.service';

import config, { EnumConfig } from '../config/config';

import { User } from '@/modules/users/entities/users.entity';

import { UsersModule } from '@/modules/users/users.module';
import { CaptchaModule } from '@/modules/captcha/captcha.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { loadEnv } from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: loadEnv(),
      isGlobal: true, // apply to all modules
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'mysql',
      useFactory: (configService: ConfigService) => {
        return {
          autoLoadEntities: true,
          //通过process.env对象获取也没有问题
          type: configService.get(EnumConfig.DB_TYPE),
          //推荐使用configService获取  configService.get('DB_HOST')
          host: configService.get(EnumConfig.DB_HOST),
          port: configService.get(EnumConfig.DB_PORT),
          username: configService.get(EnumConfig.DB_USERNAME),
          password: configService.get(EnumConfig.DB_PASSWORD),
          database: configService.get(EnumConfig.DB_DATABASE),
          timezone: 'local',
          charset: 'utf8mb4',
          entities: [User], //  在这里注册实体类
          synchronize: process.env.NODE_ENV === 'development', // （生产环境不要开启）
          logging: false,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'mongodb',
      useFactory() {
        return {
          uri: `mongodb://localhost:27017`,
          dbName: 'pmg',
          user: 'root',
          pass: 'root',
        };
      },
    }),
    UsersModule,
    CaptchaModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [{ provide: 'AppService', useClass: AppService }],
})
export class AppModule {
  constructor(configService: ConfigService) {
    console.log(configService.get(EnumConfig.DB_HOST));
  }
}
