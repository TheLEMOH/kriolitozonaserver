import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
      order: ['name'],
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    return user;
  }

  async updateUser(dto: CreateUserDto, id: number) {
    const user = await this.userRepository.update(dto, { where: { id: id } });
    return user;
  }

  async deleteUserById(id: number) {
    const users = await this.userRepository.count();

    if (users >= 2) {
      await this.userRepository.destroy({ where: { id } });
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Нельзя удалить единственного пользователя',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: 'Нельзя удалить единственного пользователя' },
      );
    }

    /*   */
    return true;
  }
}
