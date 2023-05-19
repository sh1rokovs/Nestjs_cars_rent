import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CarsModule } from '../cars/cars.module';
import { Car } from '../../database/entities/car.entity';
import { Role } from '../../database/entities/role.entity';
import { RolesModule } from '../roles/roles.module';
import { User } from '../../database/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role, Car]),
    RolesModule,
    CarsModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
