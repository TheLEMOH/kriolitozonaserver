import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementDTO } from './dto/measurement.dto';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/measurement')
export class MeasurementController {
  constructor(private service: MeasurementService) {}

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() dto: MeasurementDTO[]) {
    return this.service.create(dto);
  }

  @Get()
  getByExperiment(@Query('experimentId') experimentId: number) {
    return this.service.getByExperiment(experimentId);
  }

  @Put()
  @UseGuards(new RolesGuard())
  updateBulk(
    @Body() items: MeasurementDTO[],
    @Query('experimentId') experimentId: number,
  ) {
    return this.service.updateBulk(items, experimentId);
  }
}
