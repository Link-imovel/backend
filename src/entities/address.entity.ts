import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { Home } from './home.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => Home, (home) => home.id)
  id: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  street2: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column({ nullable: true })
  ibge: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
