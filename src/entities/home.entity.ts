import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
