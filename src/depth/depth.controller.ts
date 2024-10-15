import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guard/guadr';
import { DepthService } from './depth.service';
import { DepthDTO } from './dto/depth.dto';

@Controller('/api/depth')
export class DepthController {
  constructor(private service: DepthService) {}

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() items: DepthDTO[]) {
    return this.service.create(items);
  }

  @Get()
  getByExperiment(@Query('experimentId') experimentId: number) {
    return this.service.getByExperiment(experimentId);
  }

  @Put()
  @UseGuards(new RolesGuard())
  updateBulk(
    @Body() items: DepthDTO[],
    @Query('experimentId') experimentId: number,
  ) {
    return this.service.updateBulk(items, experimentId);
  }
}
