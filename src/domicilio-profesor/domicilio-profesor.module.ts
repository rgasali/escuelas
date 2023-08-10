import { Module } from '@nestjs/common';
import { DomicilioProfesorService } from './domicilio-profesor.service';
import { DomicilioProfesorController } from './domicilio-profesor.controller';
import { DomicilioProfesor } from './entities/domicilio-profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DomicilioProfesor])],
  controllers: [DomicilioProfesorController],
  providers: [DomicilioProfesorService],
})
export class DomicilioProfesorModule {}
