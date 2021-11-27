import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
  Body,
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
  async getPublications(
    @Query('page') page: number,
    @Query('text') text: string,
    @Query('state') state: string,
    @Query('zip') zip: string,
    @Query('garage') garage: string,
    @Query('bedroom') bedroom: string,
    @Query('bathroom') bathroom: string,
    @Query('kitchen') kitchen: string,
    @Query('value') value: string,
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<Publication[]> {
    return await this.publicationService.findAll(
      page,
      text,
      state,
      zip,
      garage,
      bedroom,
      bathroom,
      kitchen,
      value,
      latitude,
      longitude,
    );
  }

  @Get(':id')
  async getPublication(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: any,
    @Body() data: CreatePublicationDTO,
  ): Promise<Publication> {
    return await this.publicationService.create(req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePublicationDTO,
    @Request() req: any,
  ): Promise<Publication> {
    return await this.publicationService.update(id, data, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deactivate(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    return await this.publicationService.deactivate(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/activate')
  async activate(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Publication> {
    return await this.publicationService.activate(id, req.user);
  }
}
