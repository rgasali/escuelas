import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';


@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  create(profesorDto: CreateProfesorDto) {
    const p = this.profesorRepository.create(profesorDto);
    return this.profesorRepository.save(p);
  }

  findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }

  async findOne(id: number) {
    const p = await this.profesorRepository.findOneBy({ idProfesor: id });
    if (p) return p;

    throw new HttpException(
      'No existe un profesor con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.findOne(id);
    try {
      const result = await this.profesorRepository.update(
        { idProfesor: id },
        { ...updateProfesorDto, idProfesor: id },
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
    const r = await this.profesorRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe profesor con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
