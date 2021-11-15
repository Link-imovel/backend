import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Publication } from 'src/entities/publication.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreatePublicationDTO from './dto/create.dto';
import UpdatePublicationDTO from './dto/update.dto';
import { IPublicationsController } from './interfaces/publications.controller';
import { PublicationsService } from './publications.service';

@Controller('publication')
export class PublicationController implements IPublicationsController {
  constructor(private publicationService: PublicationsService) {}

  @Get()
  async getPublications(): Promise<Publication[]> {
    return await this.publicationService.findAll();
  }

  @Get(':id')
  async getPublication(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    data: CreatePublicationDTO,
  ): Promise<Publication> {
    return await this.publicationService.create(userId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    data: UpdatePublicationDTO,
  ): Promise<Publication> {
    return await this.publicationService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deactivate(@Param('id') id: string): Promise<void> {
    return await this.publicationService.deactivate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/activate')
  async activate(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.activate(id);
  }
}
