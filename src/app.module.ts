import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DomicilioProfesorModule } from './domicilio-profesor/domicilio-profesor.module';
import { DomicilioEstudianteModule } from './domicilio-estudiante/domicilio-estudiante.module';
import { ClaseModule } from './clase/clase.module';
import { EstudianteClaseModule } from './estudiante-clase/estudiante-clase.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { EscuelaModule } from './escuela/escuela.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'R$gasali123',
      database: 'escolar',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),
    CiudadModule,
    ProfesorModule,
    EstudianteModule,
    DomicilioProfesorModule,
    DomicilioEstudianteModule,
    ClaseModule,
    EstudianteClaseModule,
    AsistenciaModule,
    EscuelaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
