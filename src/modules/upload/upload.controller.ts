import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { UploadService } from './upload.service';

@Controller('upload')
@UseInterceptors(TransformInterceptor)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 1024 * 1024 * 5 } }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }
}
