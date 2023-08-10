import { Module } from '@nestjs/common';
import { DomicilioEstudianteService } from './domicilio-estudiante.service';
import { DomicilioEstudianteController } from './domicilio-estudiante.controller';
import { DomicilioEstudiante } from './entities/domicilio-estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DomicilioEstudiante])],
  controllers: [DomicilioEstudianteController],
  providers: [DomicilioEstudianteService],
})
export class DomicilioEstudianteModule {}
