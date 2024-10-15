import { Module } from '@nestjs/common';
import { DepthController } from './depth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Depth } from './depth.model';
import { DepthService } from './depth.service';

@Module({
  controllers: [DepthController],
  imports: [SequelizeModule.forFeature([Depth])],
  providers: [DepthService],
  exports: [DepthService],
})
export class DepthModule {}
