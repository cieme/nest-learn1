import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true, // apply to all modules
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: 'AppService', useClass: AppService }],
})
export class AppModule {
  constructor() {
    console.log(process.env.DATABASE_USER);
    console.log(process.env.DATABASE_PASSWORD);
  }
}
