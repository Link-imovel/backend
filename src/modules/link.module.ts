import { Module } from '@nestjs/common';
import { AddressModule } from './addresses/addresses.module';
import { HomeModule } from './homes/homes.module';
import { ImagesModule } from './images/images.module';
import { PublicationModule } from './publications/publications.module';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AddressModule,
    HomeModule,
    PublicationModule,
    TokenModule,
    UsersModule,
    ImagesModule,
  ],
})
export class LinkModule {}
