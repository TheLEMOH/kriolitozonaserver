import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ExperimentModule } from './experiment/experiment.module';
import { HorizonModule } from './horizon/horizon.module';
import { DepthModule } from './depth/depth.module';
import { MeasurementModule } from './measurement/measurement.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { Experiment } from './experiment/experiment.model';
import { Horizon } from './horizon/horizon.model';
import { Depth } from './depth/depth.model';
import { Measurement } from './measurement/measurement.model';
import { ImageModule } from './Images/image.module';
import { FileModule } from './file/file.module';
import { User } from './user/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      sync: { alter: true },
      username: 'postgres',
      password: 'admin',
      database: 'krio',
      autoLoadModels: true,
      models: [Experiment, Horizon, Depth, Measurement, User],
      logging: false,
    }),

    ServeStaticModule.forRoot({
      serveRoot: '/api/images/',
      rootPath: join(__dirname, '..', 'images'),
    }),

    ExperimentModule,
    HorizonModule,
    DepthModule,
    MeasurementModule,
    ImageModule,
    UsersModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
})
export class AppModule {}
