import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profesor')
export class Profesor {
  @PrimaryGeneratedColumn()
  idProfesor: number;
  @Column({ unique: true })
  nombre: string;
  @Column({ unique: true })
  apellido: string;

  constructor(nombre: string, apellido: string) {
    this.nombre = nombre;
    this.apellido = apellido;
  }
}
