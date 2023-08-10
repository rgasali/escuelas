import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  idEstudiante: number;
  @Column({ unique: true })
  nombre: string;
  @Column({ unique: true })
  apellido: string;
  @Column()
  fechaNacimiento: Date;

  constructor(nombre: string, apellido: string, fechaNacimiento: Date) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
  }
}
