import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { MyLogger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // logger: new MyLogger(),
  });

  const config = new DocumentBuilder()
    .setTitle('LINK_')
    .setDescription('Real Estate LINK_ Service')
    .setVersion('1.0')
    .addTag('real estate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
