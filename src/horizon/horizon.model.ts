import {
  Table,
  DataType,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { HorizonDTO } from './dto/horizon.dto';
import { Experiment } from 'src/experiment/experiment.model';

@Table({ tableName: 'horizon' })
export class Horizon extends Model<Horizon, HorizonDTO> {
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

  @Column({ type: DataType.INTEGER })
  depthLowerLimitOfHorizon: number;

  @Column({ type: DataType.FLOAT })
  horizonDensity: number;

  @Column({ type: DataType.FLOAT })
  organicContentSubstances: number;

  @Column({ type: DataType.FLOAT })
  physicalSandContent: number;

  @Column({ type: DataType.FLOAT })
  physicalClayContent: number;

  @Column({ type: DataType.STRING })
  granularComposition: string;

  @ForeignKey(() => Experiment)
  experimentId: number;
}
