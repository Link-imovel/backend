import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from 'src/entities/home.entity';
import { AddressModule } from '../addresses/addresses.module';
import { ImagesModule } from '../images/images.module';
import { HomesService } from './homes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Home]), ImagesModule, AddressModule],
  controllers: [],
  providers: [HomesService],
  exports: [HomesService],
})
export class HomeModule {}
