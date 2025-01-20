import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NesService } from './nes.service';
import { CreateNeDto } from './dto/create-ne.dto';
import { UpdateNeDto } from './dto/update-ne.dto';

@Controller('nes')
export class NesController {
  constructor(private readonly nesService: NesService) {}

  @Post()
  create(@Body() createNeDto: CreateNeDto) {
    return this.nesService.create(createNeDto);
  }

  @Get()
  findAll() {
    return this.nesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeDto: UpdateNeDto) {
    return this.nesService.update(+id, updateNeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nesService.remove(+id);
  }
}
