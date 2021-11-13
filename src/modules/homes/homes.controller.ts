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
import { Home } from 'src/entities/home.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HomesDTO } from './dto/homes.dto';
import { HomesService } from './homes.service';

@Controller('homes')
export class HomesController {
  constructor(private homesService: HomesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: string): Promise<Home> {
    return await this.homesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Home[]> {
    return await this.homesService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: Required<HomesDTO>): Promise<Home> {
    return await this.homesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<HomesDTO>,
  ): Promise<Home> {
    return await this.homesService.update({ id, ...data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.homesService.remove(id);
  }
}
