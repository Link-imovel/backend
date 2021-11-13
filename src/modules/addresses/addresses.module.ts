import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { AuthModule } from '../auth/auth.module';
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), forwardRef(() => AuthModule)],
  controllers: [],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressModule {}
