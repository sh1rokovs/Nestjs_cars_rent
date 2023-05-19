import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AuthModule } from './app/auth/auth.module';
import { CarsModule } from './app/cars/cars.module';
import { RolesModule } from './app/roles/roles.module';
import { UsersModule } from './app/users/users.module';
import { appDataSource } from './database/config/typeorm.config';

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
    TypeOrmModule.forRoot(appDataSource.options),
    UsersModule,
    RolesModule,
    AuthModule,
    CarsModule,
  ],
})
export class AppModule {}
