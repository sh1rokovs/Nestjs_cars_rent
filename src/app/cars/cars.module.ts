import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entity/user.entity';
import { UsersModule } from '../users/users.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entity/car.entity';
import { Role } from 'src/app/roles/entity/role.entity';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [TypeOrmModule.forFeature([User, Role, Car]), UsersModule],
  exports: [CarsService],
})
export class CarsModule {}
