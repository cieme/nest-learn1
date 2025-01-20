import { Test, TestingModule } from '@nestjs/testing';
import { NesController } from './nes.controller';
import { NesService } from './nes.service';

describe('NesController', () => {
  let controller: NesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NesController],
      providers: [NesService],
    }).compile();

    controller = module.get<NesController>(NesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
