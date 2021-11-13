import { Address } from 'src/entities/address.entity';
import CreateAddressDTO from '../dto/create.dto';
import UpdateAddressDTO from '../dto/update.dto';

interface IAdressesService {
  create: (data: CreateAddressDTO) => Promise<Address>;
  update: (id: string, data: UpdateAddressDTO) => Promise<Address>;
}

export type { IAdressesService };
