import { Module } from '@nestjs/common';
import { MeasurementController } from './measurement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Measurement } from './measurement.model';
import { MeasurementService } from './measurement.service';

@Module({
  controllers: [MeasurementController],
  imports: [SequelizeModule.forFeature([Measurement])],
  providers: [MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}
