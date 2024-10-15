import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HorizonService } from './horizon.service';
import { HorizonDTO } from './dto/horizon.dto';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/horizon')
export class HorizonController {
  constructor(private service: HorizonService) {}

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() dto: HorizonDTO[]) {
    return this.service.create(dto);
  }

  @Get()
  getByExperiment(@Query('experimentId') experimentId: number) {
    return this.service.getByExperiment(experimentId);
  }

  @Put()
  @UseGuards(new RolesGuard())
  updateBulk(
    @Body() items: HorizonDTO[],
    @Query('experimentId') experimentId: number,
  ) {
    return this.service.updateBulk(items, experimentId);
  }
}
