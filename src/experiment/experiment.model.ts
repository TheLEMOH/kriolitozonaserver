import { Table, DataType, Column, Model, HasMany } from 'sequelize-typescript';
import { CreateExperimentDTO } from './dto/experiment.dto';
import { Horizon } from 'src/horizon/horizon.model';
import { Depth } from 'src/depth/depth.model';
import { Measurement } from 'src/measurement/measurement.model';

@Table({ tableName: 'experiment' })
export class Experiment extends Model<Experiment, CreateExperimentDTO> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DATE })
  date: string;

  @Column({ type: DataType.INTEGER })
  number: number;

  @Column({ type: DataType.STRING })
  soilProfileCondition: string;

  @Column({ type: DataType.STRING })
  landscape: string;

  @Column({ type: DataType.STRING })
  lat: string;

  @Column({ type: DataType.STRING })
  long: string;

  @Column({ type: DataType.STRING })
  geobotany: string;

  @Column({ type: DataType.STRING })
  microrelief: string;

  @Column({ type: DataType.STRING })
  typeOfSoil: string;

  @Column({ type: DataType.BOOLEAN })
  isGleying: boolean;

  @Column({ type: DataType.BOOLEAN })
  isPermafrost: boolean;

  @Column({ type: DataType.BOOLEAN })
  isPyrogenic: boolean;

  @Column({ type: DataType.FLOAT })
  permafrostBoundary: number;

  @Column({ type: DataType.INTEGER })
  numberOfSoilCuts: number;

  @Column({ type: DataType.STRING })
  granularComposition: string;

  @Column({ type: DataType.FLOAT })
  airTemperature: number;

  @Column({ type: DataType.FLOAT })
  layerDepth: number;

  @Column({ type: DataType.FLOAT })
  humidity: number;

  @Column({ type: DataType.FLOAT })
  surfaceAlbedo: number;

  @Column({ type: DataType.INTEGER })
  numberOfGPRTracks: number;

  @Column({ type: DataType.STRING })
  scanningFrequency: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: [];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  files: [];

  @HasMany(() => Horizon, { onDelete: 'CASCADE' })
  horizons: Horizon[];

  @HasMany(() => Depth, { onDelete: 'CASCADE' })
  depths: Depth[];

  @HasMany(() => Measurement, { onDelete: 'CASCADE' })
  measurements: Depth[];
}
