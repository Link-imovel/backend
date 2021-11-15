import { Publication } from 'src/entities/publication.entity';
import CreatePublicationDTO from '../dto/create.dto';
import UpdatePublicationDTO from '../dto/update.dto';

interface IPublicationsController {
  getPublications: () => Promise<Publication[]>;
  getPublication: (id: string) => Promise<Publication>;
  create: (userId: string, data: CreatePublicationDTO) => Promise<Publication>;
  update: (id: string, data: UpdatePublicationDTO) => Promise<Publication>;
  deactivate: (id: string) => Promise<void>;
  activate: (id: string) => Promise<Publication>;
}

export type { IPublicationsController };
