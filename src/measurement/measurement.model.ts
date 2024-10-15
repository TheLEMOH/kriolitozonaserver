import {
  Table,
  DataType,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { MeasurementDTO } from './dto/measurement.dto';
import { Experiment } from 'src/experiment/experiment.model';

@Table({ tableName: 'measurement' })
export class Measurement extends Model<Measurement, MeasurementDTO> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER })
  value: number;

  @Column({ type: DataType.FLOAT })
  heatFlowMeasurementLevel: number;

  @Column({ type: DataType.FLOAT })
  bottomLayerTemperature: number;

  @Column({ type: DataType.FLOAT })
  topLayerTemperature: number;

  @Column({ type: DataType.FLOAT })
  heatFlowValue: number;

  @ForeignKey(() => Experiment)
  experimentId: number;
}
