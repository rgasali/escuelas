import { Module } from '@nestjs/common';
import { EstudianteClaseService } from './estudiante-clase.service';
import { EstudianteClaseController } from './estudiante-clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteClase } from './entities/estudiante-clase.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteClase, Asistencia])],
  controllers: [EstudianteClaseController],
  providers: [EstudianteClaseService],
})
export class EstudianteClaseModule {}
