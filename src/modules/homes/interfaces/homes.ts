import CreateAddressDTO from 'src/modules/addresses/dto/create.dto';
import UpdateAddressDTO from 'src/modules/addresses/dto/update.dto';
import CreateImageDTO from 'src/modules/images/dto/create.dto';
import UpdateImageDTO from 'src/modules/images/dto/update.dto';

interface CreateHome {
  type: string;
  ref: string;
  totalArea: number;
  value: number;
  room: number;
  bedroom: number;
  bathroom: number;
  kitchen: number;
  garage: number;
  serviceArea: number;
  buildAt: Date;
  address: CreateAddressDTO;
  images: CreateImageDTO | CreateImageDTO[];
}

interface UpdateHome extends Partial<Omit<CreateHome, 'address' | 'images'>> {
  address: UpdateAddressDTO;
  images: UpdateImageDTO | UpdateImageDTO[];
}

export type { CreateHome, UpdateHome };
