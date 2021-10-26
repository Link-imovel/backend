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

@Entity('homes')
export class Home {
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Publication)
  @ManyToMany(() => Image)
  @ManyToOne(() => Address)
  id?: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  ref: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  value: number;

  @Column({ nullable: true })
  room: number;

  @Column({ nullable: true })
  bedroom: number;

  @Column({ nullable: true })
  bathroom: number;

  @Column({ nullable: true })
  kitchen: number;

  @Column({ nullable: true })
  garage: number;

  @Column({ nullable: true })
  serviceArea: number;

  @Column({ nullable: true })
  buildAt: string;

  @Column({ nullable: true })
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
