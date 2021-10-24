import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDB } from './config/ormconfig';
import { UserController } from './controller/user.controller';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(getDB())],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
