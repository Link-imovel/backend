import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from 'src/entities/home.entity';
import { AddressModule } from '../addresses/addresses.module';
import { AuthModule } from '../auth/auth.module';
import { ImagesModule } from '../images/images.module';
import { HomesController } from './homes.controller';
import { HomesService } from './homes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Home]),
    forwardRef(() => AuthModule),
    ImagesModule,
    AddressModule,
  ],
  controllers: [HomesController],
  providers: [HomesService],
  exports: [HomesService],
})
export class HomeModule {}
