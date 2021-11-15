import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from 'src/entities/publication.entity';
import { AuthModule } from '../auth/auth.module';
import { HomeModule } from '../homes/homes.module';
import { PublicationController } from './publications.controller';
import { PublicationsService } from './publications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
    forwardRef(() => AuthModule),
    HomeModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationsService],
  exports: [PublicationsService],
})
export class PublicationModule {}
