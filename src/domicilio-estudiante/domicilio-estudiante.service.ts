import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDomicilioEstudianteDto } from './dto/create-domicilio-estudiante.dto';
import { UpdateDomicilioEstudianteDto } from './dto/update-domicilio-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomicilioEstudiante } from './entities/domicilio-estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DomicilioEstudianteService {
  constructor(
    @InjectRepository(DomicilioEstudiante)
    private readonly domicilioEstudianteRepository: Repository<DomicilioEstudiante>,
  ) {}

  create(domicilioEstudianteDto: CreateDomicilioEstudianteDto) {
    const d = this.domicilioEstudianteRepository.create(domicilioEstudianteDto);
    return this.domicilioEstudianteRepository.save(d);
  }

  findAll(): Promise<DomicilioEstudiante[]> {
    return this.domicilioEstudianteRepository.find();
  }

  async findOne(id: number) {
    const d = await this.domicilioEstudianteRepository.findOneBy({
      idDomicilioEstudiante: id,
    });
    if (d) return d;

    throw new HttpException(
      'No existe un domicilio con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(
    id: number,
    updateDomicilioEstudianteDto: UpdateDomicilioEstudianteDto,
  ) {
    await this.findOne(id);
    try {
      const result = await this.domicilioEstudianteRepository.update(
        { idDomicilioEstudiante: id },
        { ...updateDomicilioEstudianteDto, idDomicilioEstudiante: id },
      );
      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'no se pudo realizar la modificacion',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  async remove(id: number) {
    const r = await this.domicilioEstudianteRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe domicilio con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
