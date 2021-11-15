import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Home } from './home.entity';
import { User } from './user.entity';

@Entity('publications')
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Column()
  @OneToOne(() => Home, (home) => home.id)
  homeId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  reserved: boolean;

  @Column({ nullable: true })
  views: number;

  @Column({ nullable: true })
  virtualTour: string;

  @Column({ nullable: true })
  rented: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
