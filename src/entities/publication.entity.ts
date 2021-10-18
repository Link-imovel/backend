import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // userID: string;

  // @Column()
  // homeId: string;

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
