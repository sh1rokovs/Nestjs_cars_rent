import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entity/user.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entity/car.entity';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [TypeOrmModule.forFeature([User, Car])],
  exports: [CarsService],
})
export class CarsModule {}
