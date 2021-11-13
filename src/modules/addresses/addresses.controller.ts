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
import { Address } from 'src/entities/address.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddressesDTO } from './dto/addresses.dto';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id') id: string): Promise<Address> {
    return await this.addressesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Address[]> {
    return await this.addressesService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() data: Required<AddressesDTO>): Promise<Address> {
    return await this.addressesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<AddressesDTO>,
  ): Promise<Address> {
    return await this.addressesService.update({ id, ...data });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<void> {
    this.addressesService.remove(id);
  }
}
