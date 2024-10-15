import { Module } from '@nestjs/common';
import { ExperimentController } from './experiment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Experiment } from './experiment.model';
import { ExperimentService } from './experiment.service';

@Module({
  controllers: [ExperimentController],
  imports: [SequelizeModule.forFeature([Experiment])],
  providers: [ExperimentService],
  exports: [ExperimentService],
})
export class ExperimentModule {}
