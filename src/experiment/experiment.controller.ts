import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ExperimentService } from './experiment.service';
import { CreateExperimentDTO } from './dto/experiment.dto';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/experiment')
export class ExperimentController {
  constructor(private service: ExperimentService) {}

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() dto: CreateExperimentDTO) {
    return this.service.create(dto);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Put('/:id')
  @UseGuards(new RolesGuard())
  updateById(@Body() item: CreateExperimentDTO, @Param('id') id: number) {
    return this.service.updateById(item, id);
  }

  @Delete('/:id')
  @UseGuards(new RolesGuard())
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
