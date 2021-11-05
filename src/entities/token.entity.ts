import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => User)
  id?: string;

  @Column()
  hash: string;

  @Column()
  username: string;
}
