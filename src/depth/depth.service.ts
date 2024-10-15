import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Depth } from './depth.model';
import { DepthDTO } from './dto/depth.dto';

@Injectable()
export class DepthService {
  constructor(@InjectModel(Depth) private repository: typeof Depth) {}

  async create(items: DepthDTO[]) {
    const item = await this.repository.bulkCreate(items);
    return item;
  }

  async getDepths() {
    const items = await this.repository.findAll();

    return items;
  }

  async updateBulk(items: DepthDTO[], experimentId: number) {
    const oldItems = await this.getByExperiment(experimentId);

    const oldId = oldItems.map((item) => item.id);
    const newId = items.map((item) => item.id);

    const forDelete = oldId.filter((x) => !newId.includes(x));

    const forCreate = items.filter((item) => !item.id);
    const forUpdate = items.filter((item) => item.id);

    await this.create(forCreate);

    forUpdate.forEach((item: DepthDTO) => {
      this.repository.update(item, { where: { id: item.id } });
    });

    forDelete.forEach((id: number) => {
      this.repository.destroy({ where: { id } });
    });

    return true;
  }

  async getByExperiment(experimentId: number) {
    const items = await this.repository.findAll({
      where: { experimentId },
      order: [['value', 'ASC']],
    });

    return items;
  }
}
