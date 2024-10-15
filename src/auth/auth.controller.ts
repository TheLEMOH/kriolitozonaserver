import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { EnterUserDto } from './dto/enterUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: EnterUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/refresh')
  refresh(@Body() token: RefreshDto) {
    return this.authService.refresh(token);
  }
}
