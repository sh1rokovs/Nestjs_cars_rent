import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();
const url = configService.get('DATABASE_URL');

const options: DataSourceOptions & SeederOptions = {
  url: url,
  type: 'postgres',
  entities: ['./dist/database/entities/**/*{.ts,.js}'],
  migrations: ['./dist/database/migrations/**/*{.ts,.js}'],
  seeds: ['./dist/database/seeds/**/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
