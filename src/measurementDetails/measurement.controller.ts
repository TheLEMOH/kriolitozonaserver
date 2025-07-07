import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MeasurementDetailsService } from './measurement.service';
import { MeasurementDetailsDTO } from './dto/measurementDetails.dto';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/measurement-details')
export class MeasurementDetailsController {
  constructor(private service: MeasurementDetailsService) { }

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() dto: MeasurementDetailsDTO[]) {
    return this.service.create(dto);
  }

  @Get()
  getByExperiment(@Query('experimentId') experimentId: number) {
    return this.service.getByExperiment(experimentId);
  }

  @Put()
  @UseGuards(new RolesGuard())
  updateBulk(
    @Body() items: MeasurementDetailsDTO[],
    @Query('experimentId') experimentId: number,
  ) {
    return this.service.updateBulk(items, experimentId);
  }
}
