import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  create(estudianteDto: CreateEstudianteDto) {
    const e = this.estudianteRepository.create(estudianteDto);
    return this.estudianteRepository.save(e);
  }

  findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async findOne(id: number) {
    const e = await this.estudianteRepository.findOneBy({ idEstudiante: id });
    if (e) return e;

    throw new HttpException(
      'No existe un estudiante con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    await this.findOne(id);
    try {
      const result = await this.estudianteRepository.update(
        { idEstudiante: id },
        { ...updateEstudianteDto, idEstudiante: id },
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
    const e = await this.estudianteRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${e.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (e.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe estudiante con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
