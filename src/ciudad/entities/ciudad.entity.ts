import { DomicilioEstudiante } from 'src/domicilio-estudiante/entities/domicilio-estudiante.entity';
import { DomicilioProfesor } from 'src/domicilio-profesor/entities/domicilio-profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn()
  idCiudad: number;
  @Column({ unique: true })
  nombre: string;
  @Column({ unique: true })
  codPostal: string;
  @OneToOne((type) => DomicilioProfesor)
  @JoinColumn()
  public domicilioProfesor: DomicilioProfesor;
  @OneToOne((type) => DomicilioEstudiante)
  @JoinColumn()
  public domicilioEstudiante: DomicilioEstudiante;
  @OneToOne((type) => Escuela)
  @JoinColumn()
  public escuela: Escuela;

  constructor(nombre: string, codPostal: string) {
    this.nombre = nombre;
    this.codPostal = codPostal;
  }
}
