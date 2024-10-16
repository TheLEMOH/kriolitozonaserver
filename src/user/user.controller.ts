import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { RolesGuard } from 'src/guard/guadr';

@Controller('/api/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(new RolesGuard())
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  @UseGuards(new RolesGuard())
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(new RolesGuard())
  getById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Put('/:id')
  @UseGuards(new RolesGuard())
  updateById(@Body() userDto: CreateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(userDto, id);
  }

  @Delete('/:id')
  @UseGuards(new RolesGuard())
  deleteById(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}
