import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estudianteClase')
export class EstudianteClase {
  @PrimaryGeneratedColumn()
  idEstudianteClase: number;
  @ManyToOne((type) => Asistencia, (asistencia) => asistencia.estudiante)
  @JoinColumn()
  public asistencia: Asistencia;
}
