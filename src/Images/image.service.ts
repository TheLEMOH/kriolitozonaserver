import { Injectable, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class ImageService {
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { id } = req.params;

          console.log(file);

          const path = `./images/dfg`;

          cb(null, path);
        },
        filename: (req, file, cb) => {
          console.log(file);
          const uniqueSuffix = Buffer.from(file.originalname).toString('utf8');

          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async save(images: Array<Express.Multer.File>) {
    const names = images.map((image) => image.filename);
    return names;
  }
}
