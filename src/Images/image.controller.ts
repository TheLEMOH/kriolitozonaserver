import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/images')
export class ImageController {
  @Post('/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { id } = req.params;

          const path = `./images/${id}`;

          cb(null, path);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Buffer.from(file.originalname).toString('utf8');

          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async saveImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    const names = images.map((image) => image.filename);
    return names;
  }

  @Delete('/:experimentId/:imageId')
  async deleteByid(
    @Param('experimentId') experimentId: number,
    @Param('imageId') imageId: string,
  ) {
    unlink(`./images/${experimentId}/${imageId}`, (error) => {
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
