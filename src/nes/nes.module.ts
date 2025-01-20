import { Module } from '@nestjs/common';
import { NesService } from './nes.service';
import { NesController } from './nes.controller';

@Module({
  controllers: [NesController],
  providers: [NesService],
})
export class NesModule {}
