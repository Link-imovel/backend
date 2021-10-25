import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { SeedingMiddleware } from 'src/middlewares/seed.middleware';

@Module({})
export class SeedingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes('*');
  }
}
