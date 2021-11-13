import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from '../../entities/publication.entity';
import { PublicationDTO } from './dto/publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
  ) {}

  async findOne(id: string): Promise<Publication> {
    return this.publicationsRepository.findOne(id);
  }

  async list(): Promise<Publication[]> {
    return await this.publicationsRepository.find();
  }

  async create(data: Required<PublicationDTO>): Promise<Publication> {
    let publication = new Publication();

    publication = { ...data };
    publication = await this.publicationsRepository.save(publication);
    return await this.publicationsRepository.findOne({ id: publication.id });
  }

  async update(data: Partial<PublicationDTO>): Promise<Publication> {
    const { id } = await this.publicationsRepository.findOne(data.id);
    await this.publicationsRepository.update({ id }, { ...data });
    return this.publicationsRepository.findOne(data.id);
  }

  remove(id: string): void {
    this.publicationsRepository.delete(id);
  }
}
