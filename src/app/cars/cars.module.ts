import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../database/entities/user.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from '../../database/entities/car.entity';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [TypeOrmModule.forFeature([User, Car])],
  exports: [CarsService],
})
export class CarsModule {}
