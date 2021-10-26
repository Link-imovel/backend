import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  @ManyToOne(() => Home)
  homeId: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
