import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permissions.entity';
import { Publication } from './publication.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Publication, (publication) => publication.userId)
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  registry: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  creci: string;

  @Column()
  birthday: Date;

  @Column('uuid')
  @OneToOne(() => Permission)
  permissionLevel: string;

  @Column({ nullable: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Publication, (publication) => publication.userId, {
    eager: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  publication: Publication[];
}
