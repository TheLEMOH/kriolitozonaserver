import {
  Table,
  DataType,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { MeasurementDetailsDTO } from './dto/measurementDetails.dto';
import { Experiment } from 'src/experiment/experiment.model';

@Table({ tableName: 'measurementDetails' })
export class MeasurementDetails extends Model<MeasurementDetails, MeasurementDetailsDTO> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.FLOAT })
  airTemperature: number;

  @Column({ type: DataType.INTEGER })
  layerDepth: number;

  @Column({ type: DataType.FLOAT })
  humidity: number;

  @Column({ type: DataType.FLOAT })
  surfaceAlbedo: number;

  @Column({ type: DataType.INTEGER })
  numberOfGPRTracks: number;

  @Column({ type: DataType.STRING })
  scanningFrequency: string;

  @ForeignKey(() => Experiment)
  experimentId: number;
}
