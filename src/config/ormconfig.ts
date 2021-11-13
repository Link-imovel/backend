import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDB = (): TypeOrmModuleOptions => ({
  type: process.env.TYPEORM_CONNECTION as 'postgres',
  host: process.env.TYPEORM_HOST as string,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: false,
});
