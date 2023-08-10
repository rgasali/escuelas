import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('domicilio-estudiante')
export class DomicilioEstudiante {
  @PrimaryGeneratedColumn()
  idDomicilioEstudiante: number;
  @Column({ unique: true })
  domicilio: string;

  constructor(domicilio: string) {
    this.domicilio = domicilio;
  }
}
