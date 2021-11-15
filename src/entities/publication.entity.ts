import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Home } from './home.entity';
import { User } from './user.entity';

@Entity('publications')
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: string;

  @Column()
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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Home, (home) => home, { eager: true })
  @JoinColumn({ name: 'homeId', referencedColumnName: 'id' })
  home: Home;
}
