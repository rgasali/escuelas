import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('domicilio-profesor')
export class DomicilioProfesor {
  @PrimaryGeneratedColumn()
  idDomicilioProfesor: number;
  @Column({ unique: true })
  domicilio: string;

  constructor(domicilio: string) {
    this.domicilio = domicilio;
  }
}
