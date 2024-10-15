import {
  Table,
  DataType,
  Column,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { DepthDTO } from './dto/depth.dto';
import { Experiment } from 'src/experiment/experiment.model';

@Table({ tableName: 'depth' })
export class Depth extends Model<Depth, DepthDTO> {
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
  temperatureAtDepth: number;

  @Column({ type: DataType.FLOAT })
  humidity: number;

  @Column({ type: DataType.FLOAT })
  pH: number;

  @Column({ type: DataType.FLOAT })
  thermalConductivityIndex: number;

  @Column({ type: DataType.FLOAT })
  heatFluxValue: number;

  @Column({ type: DataType.FLOAT })
  organicContentSubstances: number;

  @ForeignKey(() => Experiment)
  experimentId: number;
}
