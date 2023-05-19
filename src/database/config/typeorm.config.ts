import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');

  if (!url) {
    throw new Error('Database url is empty');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get('DB_LOGS') === 'true',
    entities: [
      join(
        process.cwd(),
        'dist',
        'database',
        'entities',
        '**',
        '*.entity.{ts,js}',
      ),
    ],
    migrations: [
      join(
        process.cwd(),
        'src',
        'database',
        'migrations',
        '**',
        '*migration.ts',
      ),
    ],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export const appDataSource = new DataSource(options());
