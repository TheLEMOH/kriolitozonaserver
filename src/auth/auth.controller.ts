import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { EnterUserDto } from './dto/enterUser.dto';
import { RolesGuard } from 'src/guard/guadr';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: EnterUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/refresh')
  @UseGuards(new RolesGuard())
  refresh(@Body() token: RefreshDto) {
    return this.authService.refresh(token);
  }
}
