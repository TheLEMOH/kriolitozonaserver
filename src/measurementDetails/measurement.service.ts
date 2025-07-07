import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeasurementDetails } from './measurement.model';
import { MeasurementDetailsDTO } from './dto/measurementDetails.dto';

@Injectable()
export class MeasurementDetailsService {
  constructor(
    @InjectModel(MeasurementDetails) private repository: typeof MeasurementDetails,
  ) { }

  async create(dto: MeasurementDetailsDTO[]) {
    const item = await this.repository.bulkCreate(dto);
    return item;
  }

  async get() {
    const items = await this.repository.findAll();
    return items;
  }

  async updateBulk(items: MeasurementDetailsDTO[], experimentId: number) {
    const oldItems = await this.getByExperiment(experimentId);

    const oldId = oldItems.map((item) => item.id);
    const newId = items.map((item) => item.id);

    const forDelete = oldId.filter((x) => !newId.includes(x));

    const forCreate = items.filter((item) => !item.id);
    const forUpdate = items.filter((item) => item.id);

    await this.create(forCreate);

    forUpdate.forEach((item: MeasurementDetailsDTO) => {
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
      order: [['id', 'ASC']],
    });

    return items;
  }
}
