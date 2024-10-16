import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt/dist';
import { EnterUserDto } from './dto/enterUser.dto';
import { RefreshDto } from './dto/refresh.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from 'src/user/user.model';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: EnterUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return { token };
  }

  async refresh(data: RefreshDto) {
    const secret = process.env.JWT_SECRET;

    if (!data.token) throw new HttpException('Ключ не найден', 401);

    const verify = await this.jwtService.verify(data.token, { secret });

    if (verify) {
      if (!verify.login) return null;

      const user = await this.usersService.getUserByLogin(verify.login);
      const token = await this.generateToken(user);
      return { token };
    } else return null;
  }

  private async generateToken(user: User) {
    const secret = process.env.JWT_SECRET;
    const payload = { id: user.id, name: user.name, login: user.login };
    const token = this.jwtService.sign(payload, { secret, expiresIn: '8h' });
    return token;
  }

  private async validateUser(userDto: EnterUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);

    if (!user) {
      throw new HttpException('Неверный логин или пароль', 401);
    }

    const pE = bcrypt.compareSync(userDto.password, user.password);

    if (!pE) {
      throw new HttpException('Неверный логин или пароль', 401);
    } else {
      return user;
    }
  }
}
