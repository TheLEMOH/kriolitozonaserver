import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Get,
  StreamableFile,
  HttpException,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/files')
export class FileController {
  @Get('/:experimentId/:fileId')
  getFile(
    @Param('experimentId') experimentId: number,
    @Param('fileId') fileId: string,
  ): StreamableFile {
    try {
      const file = createReadStream(
        join(`./files/${experimentId}`, `${fileId}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Файл не найден',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Post('/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { id } = req.params;

          const path = `./files/${id}`;

          cb(null, path);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Buffer.from(file.originalname).toString('utf8');

          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async saveImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    const names = files.map((file) => file.filename);
    return names;
  }

  @Delete('/:experimentId/:fileId')
  async deleteByid(
    @Param('experimentId') experimentId: number,
    @Param('fileId') fileId: string,
  ) {
    unlink(`./files/${experimentId}/${fileId}`, (error) => {
      if (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Файл не найден',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      } else {
        return true;
      }
    });
  }
}
