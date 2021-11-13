import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Publication } from 'src/entities/publication.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PublicationDTO } from './dto/publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: string): Promise<Publication> {
    return await this.publicationService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Publication[]> {
    return await this.publicationService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: Required<PublicationDTO>): Promise<Publication> {
    return await this.publicationService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PublicationDTO>,
  ): Promise<Publication> {
    return await this.publicationService.update({ id, ...data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.publicationService.remove(id);
  }
}
