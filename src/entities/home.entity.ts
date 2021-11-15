import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Image } from './image.entity';

@Entity('homes')
export class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'timestamptz', nullable: true })
  buildAt: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Image, (image) => image.homeId, { eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'homeId' })
  images: Image[];

  @OneToOne(() => Address, (address) => address, { eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  address: Address;
}
