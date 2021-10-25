import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Image } from './image.entity';
import { Publication } from './publication.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Publication)
  @ManyToMany(() => Image)
  @ManyToOne(() => Address)
  id?: string;

  @Column()
  type: 'admin' | 'user';

  @Column()
  ref: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  value: number;

  @Column()
  room: number;

  @Column()
  bedroom: number;

  @Column()
  bathroom: number;

  @Column()
  kitchen: number;

  @Column()
  garage: number;

  @Column()
  serviceArea: number;

  @Column()
  buildAt: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
