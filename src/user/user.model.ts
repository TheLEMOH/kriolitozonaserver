import {
  AfterSync,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { CreateUserDto } from './dto/create-user.dto';

const bcrypt = require('bcrypt');

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  get password(): string {
    return this.getDataValue('password');
  }
  set password(value: string) {
    const hashPassword = bcrypt.hashSync(value, 3);
    this.setDataValue('password', hashPassword);
  }

  @AfterSync
  static async CreateUser() {
    const exist = await this.findAll();

    if (exist.length == 0) {
      await this.create({ name: 'admin', login: 'admin', password: 'admin' });
    }
  }
}
