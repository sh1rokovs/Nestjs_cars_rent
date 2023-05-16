import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AuthModule } from './app/auth/auth.module';
import { CarsModule } from './app/cars/cars.module';
import { FilesModule } from './app/files/files.module';
import { RolesModule } from './app/roles/roles.module';
import { UsersModule } from './app/users/users.module';
import { Car } from './database/entities/car.entity';
import { Role } from './database/entities/role.entity';
import { User } from './database/entities/user.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Role, User, Car],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CarsModule,
  ],
})
export class AppModule {}
