import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../entities/address.entity';
import CreateAddressDTO from './dto/create.dto';
import UpdateAddressDTO from './dto/update.dto';
import { IAdressesService } from './interfaces/addresses.service';

@Injectable()
export class AddressesService implements IAdressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async create(data: CreateAddressDTO): Promise<Address> {
    let address = new Address();
    address = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    address = await this.addressesRepository.save(address);
    return await this.addressesRepository.findOne(address.id);
  }

  async update(id: string, data: UpdateAddressDTO): Promise<Address> {
    const address = await this.addressesRepository.findOne(id);
    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    await this.addressesRepository.update(address, data);
    return this.addressesRepository.findOne(id);
  }

  async find(id: string): Promise<Address> {
    return this.addressesRepository.findOne(id);
  }
}
