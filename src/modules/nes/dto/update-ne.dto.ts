import { PartialType } from '@nestjs/swagger';
import { CreateNeDto } from './create-ne.dto';

export class UpdateNeDto extends PartialType(CreateNeDto) {}
