import CreateAddressDTO from '../dto/create.dto';
import UpdateAddressDTO from '../dto/create.dto';
import { Address } from 'src/entities/address.entity';

interface IAddressController {
  create: (data: CreateAddressDTO) => Promise<Address>;
  update: (id: string, data: UpdateAddressDTO) => Promise<Address>;
}

export type { IAddressController };
