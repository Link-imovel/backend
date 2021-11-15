import CreateHomeDTO from 'src/modules/homes/dto/create.dto';
import UpdateHomeDTO from '../../homes/dto/update.dto';

interface CreatePublication {
  virtualTour?: string;
  phone?: string;
  home: CreateHomeDTO;
  userId: string;
}

interface UpdatePublication {
  virtualTour?: string;
  phone?: string;
  reserved?: boolean;
  views?: number;
  home?: UpdateHomeDTO;
}

export type { CreatePublication, UpdatePublication };
