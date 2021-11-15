import { ImagesService } from './images.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => AuthModule)],
  controllers: [],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
