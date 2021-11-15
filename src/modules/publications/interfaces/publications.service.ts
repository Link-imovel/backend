import { Publication } from 'src/entities/publication.entity';
import CreatePublicationDTO from '../dto/create.dto';
import UpdatePublicationDTO from '../dto/update.dto';

interface IPublicationsService {
  find: (id: string) => Promise<Publication>;
  findAll: () => Promise<Publication[]>;
  create: (userId: string, data: CreatePublicationDTO) => Promise<Publication>;
  update: (id: string, data: UpdatePublicationDTO) => Promise<Publication>;
  deactivate: (id: string) => Promise<void>;
  activate: (id: string) => Promise<Publication>;
}

export type { IPublicationsService };
