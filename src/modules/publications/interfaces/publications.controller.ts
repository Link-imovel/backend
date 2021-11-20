import { Publication } from 'src/entities/publication.entity';
import CreatePublicationDTO from '../dto/create.dto';
import UpdatePublicationDTO from '../dto/update.dto';

interface IPublicationsController {
  getPublications: (
    page?: number,
    searchText?: string,
  ) => Promise<Publication[]>;
  getPublication: (id: string) => Promise<Publication>;
  create: (userId: string, data: CreatePublicationDTO) => Promise<Publication>;
  update: (
    id: string,
    data: UpdatePublicationDTO,
    req: any,
  ) => Promise<Publication>;
  deactivate: (id: string, req: any) => Promise<void>;
  activate: (id: string, req: any) => Promise<Publication>;
}

export type { IPublicationsController };
