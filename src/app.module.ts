import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as 'postgres',
      host: process.env.TYPEORM_HOST as string,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME as string,
      password: process.env.TYPEORM_PASSWORD as string,
      database: process.env.TYPEORM_DATABASE as string,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
