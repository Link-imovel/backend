import { ImagesModule } from './modules/images/images.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { getDB } from './config/ormconfig';
import { SeedingModule } from './config/seed.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ImagesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getDB()),
    SeedingModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
