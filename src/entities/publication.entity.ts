import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home.entity';
import { User } from './user.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => User)
  userID: string;

  @Column()
  @ManyToOne(() => Home)
  homeId: string;

  @Column()
  phone: string;

  @Column()
  reserved: boolean;

  @Column()
  views: number;

  @Column()
  virtualTour: string;

  @Column()
  rented: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
