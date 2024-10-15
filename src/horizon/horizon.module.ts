import { Module } from '@nestjs/common';
import { HorizonController } from './horizon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Horizon } from './horizon.model';
import { HorizonService } from './horizon.service';

@Module({
  controllers: [HorizonController],
  imports: [SequelizeModule.forFeature([Horizon])],
  providers: [HorizonService],
  exports: [HorizonService],
})
export class HorizonModule {}
