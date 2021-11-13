import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Home } from 'src/entities/home.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateHomeDTO from './dto/create.dto';
import UpdateHomeDTO from './dto/update.dto';
import { HomesService } from './homes.service';
import { IHomesController } from './interfaces/homes.controller';

@Controller('homes')
export class HomesController implements IHomesController {
  constructor(private homesService: HomesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateHomeDTO): Promise<Home> {
    return await this.homesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateHomeDTO,
  ): Promise<Home> {
    return await this.homesService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: string): Promise<Home> {
    return await this.homesService.find(id);
  }
}
