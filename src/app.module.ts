import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { getDB } from './config/ormconfig';
import { SeedingModule } from './config/seed.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getDB()),
    UsersModule,
    SeedingModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
