import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from '../../entities/home.entity';
import { HomesDTO } from './dto/homes.dto';

@Injectable()
export class HomesService {
  constructor(
    @InjectRepository(Home)
    private homesRepository: Repository<Home>,
  ) {}

  async findOne(id: string): Promise<Home> {
    return this.homesRepository.findOne(id);
  }

  async list(): Promise<Home[]> {
    return await this.homesRepository.find();
  }

  async create(data: Required<HomesDTO>): Promise<Home> {
    return await this.homesRepository.findOne();
  }

  async update(data: Partial<HomesDTO>): Promise<Home> {
    const { id } = await this.homesRepository.findOne(data.id);
    await this.homesRepository.update({ id }, { ...data });
    return this.homesRepository.findOne(data.id);
  }

  remove(id: string): void {
    this.homesRepository.delete(id);
  }
}
