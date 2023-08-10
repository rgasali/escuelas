import { EstudianteClase } from 'src/estudiante-clase/entities/estudiante-clase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  idAsistencia: number;
  @Column()
  fecha: Date;
  @OneToMany(
    (type) => EstudianteClase,
    (estudianteClase) => estudianteClase.asistencia,
  )
  @JoinColumn()
  public estudiante: EstudianteClase[];

  constructor(fecha: Date) {
    this.fecha = fecha;
  }
}
