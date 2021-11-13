import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../entities/address.entity';
import { AddressesDTO } from './dto/addresses.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async findOne(id: string): Promise<Address> {
    return this.addressesRepository.findOne(id);
  }

  async list(): Promise<Address[]> {
    return await this.addressesRepository.find();
  }

  async create(data: Required<AddressesDTO>): Promise<Address> {
    return await this.addressesRepository.findOne();
  }

  async update(data: Partial<AddressesDTO>): Promise<Address> {
    const { id } = await this.addressesRepository.findOne(data.id);
    await this.addressesRepository.update({ id }, { ...data });
    return this.addressesRepository.findOne(data.id);
  }

  remove(id: string): void {
    this.addressesRepository.delete(id);
  }
}
