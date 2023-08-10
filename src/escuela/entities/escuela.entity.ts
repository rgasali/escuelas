import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('escuela')
export class Escuela {
  @PrimaryGeneratedColumn()
  idEscuela: number;
  @Column({ unique: true })
  nombre: string;
  @Column({ unique: true })
  domicilio: string;
  @OneToOne((type) => Ciudad)
  @JoinColumn()
  public ciudad: Ciudad;
}
