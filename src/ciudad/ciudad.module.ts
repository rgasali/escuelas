import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { DomicilioEstudiante } from 'src/domicilio-estudiante/entities/domicilio-estudiante.entity';
import { DomicilioProfesor } from 'src/domicilio-profesor/entities/domicilio-profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciudad,
      DomicilioEstudiante,
      DomicilioProfesor,
      Escuela,
    ]),
  ],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
