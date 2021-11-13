import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
