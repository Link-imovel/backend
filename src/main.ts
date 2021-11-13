import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: new MyLogger(),
  });
  await app.listen(3000);
}
bootstrap();
