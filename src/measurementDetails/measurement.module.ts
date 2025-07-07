import { Module } from '@nestjs/common';
import { MeasurementDetailsController } from './measurement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeasurementDetails } from './measurement.model';
import { MeasurementDetailsService } from './measurement.service';

@Module({
  controllers: [MeasurementDetailsController],
  imports: [SequelizeModule.forFeature([MeasurementDetails])],
  providers: [MeasurementDetailsService],
  exports: [MeasurementDetailsService],
})
export class MeasurementDetailsModule { }
