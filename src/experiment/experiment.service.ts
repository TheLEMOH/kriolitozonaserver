import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Experiment } from './experiment.model';
import { CreateExperimentDTO } from './dto/experiment.dto';

const fs = require('fs');

@Injectable()
export class ExperimentService {
  constructor(@InjectModel(Experiment) private repository: typeof Experiment) {}

  async create(dto: CreateExperimentDTO) {
    try {
      const item = await this.repository.create(dto);

      const folderImage = `./images/${item.id}`;
      const folderFile = `./files/${item.id}`;

      if (!fs.existsSync(folderImage)) {
        fs.mkdirSync(folderImage);
      }

      if (!fs.existsSync(folderFile)) {
        fs.mkdirSync(folderFile);
      }

      return item;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ошибка заполнения эксперимента',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async getAll() {
    const items = await this.repository.findAll({ order: ['date'] });
    return items;
  }

  async getById(id: number) {
    try {
      const items = await this.repository.findOne({ where: { id } });
      return items;
    } catch (error) {
      throw new HttpException({}, HttpStatus.FORBIDDEN, { cause: error });
    }
  }

  async updateById(item: any, id: number) {
    try {
      await this.repository.update(item, {
        where: { id },
      });
      return true;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ошибка заполнения эксперимента',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async deleteById(id: number) {
    await this.repository.destroy({ where: { id } });

    fs.rmSync(`./images/${id}`, { recursive: true, force: true });
    fs.rmSync(`./files/${id}`, { recursive: true, force: true });

    return true;
  }
}
