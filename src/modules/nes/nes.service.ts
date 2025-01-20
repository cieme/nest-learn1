import { Injectable } from '@nestjs/common';
import { CreateNeDto } from './dto/create-ne.dto';
import { UpdateNeDto } from './dto/update-ne.dto';

@Injectable()
export class NesService {
  create(createNeDto: CreateNeDto) {
    console.log(createNeDto);
    return 'This action adds a new ne';
  }

  findAll() {
    return `This action returns all nes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ne`;
  }

  update(id: number, updateNeDto: UpdateNeDto) {
    console.log(updateNeDto);
    return `This action updates a #${id} ne`;
  }

  remove(id: number) {
    return `This action removes a #${id} ne`;
  }
}
