import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Home } from './home.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Home)
  id?: string;

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
