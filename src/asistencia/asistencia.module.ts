import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { EstudianteClase } from 'src/estudiante-clase/entities/estudiante-clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, EstudianteClase])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
