import { Publication } from 'src/entities/publication.entity';
import CreatePublicationDTO from '../dto/create.dto';
import UpdatePublicationDTO from '../dto/update.dto';

interface IPublicationsService {
  find: (id: string) => Promise<Publication>;
  findAll: (
    page?: number,
    searchText?: string,
    state?: string,
    zip?: string,
    garage?: string,
    bedroom?: string,
    bathroom?: string,
    kitchen?: string,
    value?: string,
    latitude?: string,
    longitude?: string,
  ) => Promise<Publication[]>;
  create: (userId: string, data: CreatePublicationDTO) => Promise<Publication>;
  update: (
    id: string,
    data: UpdatePublicationDTO,
    user: any,
  ) => Promise<Publication>;
  deactivate: (id: string, user: any) => Promise<void>;
  activate: (id: string, user: any) => Promise<Publication>;
}

export type { IPublicationsService };
