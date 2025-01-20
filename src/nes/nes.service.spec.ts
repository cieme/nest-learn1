import { Test, TestingModule } from '@nestjs/testing';
import { NesService } from './nes.service';

describe('NesService', () => {
  let service: NesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NesService],
    }).compile();

    service = module.get<NesService>(NesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
