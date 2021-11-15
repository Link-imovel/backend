import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Home } from './home.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  @ManyToOne(() => Home, (home) => home.id)
  homeId: string;

  @Column({
    type: 'bytea',
  })
  image: Uint8Array;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
