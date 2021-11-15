import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressModule {}
