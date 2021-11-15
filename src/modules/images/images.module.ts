import { ImagesService } from './images.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
