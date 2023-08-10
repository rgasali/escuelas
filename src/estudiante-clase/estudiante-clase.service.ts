import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteClaseDto } from './dto/create-estudiante-clase.dto';
import { UpdateEstudianteClaseDto } from './dto/update-estudiante-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteClase } from './entities/estudiante-clase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteClaseService {
  constructor(
    @InjectRepository(EstudianteClase)
    private readonly estudianteClaseRepository: Repository<EstudianteClase>,
  ) {}

  create(estudianteClaseDto: CreateEstudianteClaseDto) {
    const ec = this.estudianteClaseRepository.create(estudianteClaseDto);
    return this.estudianteClaseRepository.save(ec);
  }

  findAll(): Promise<EstudianteClase[]> {
    return this.estudianteClaseRepository.find();
  }

  async findOne(id: number) {
    const ec = await this.estudianteClaseRepository.findOneBy({
      idEstudianteClase: id,
    });
    if (ec) return ec;

    throw new HttpException(
      'No se encontro respuesta para ese id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateEstudianteClaseDto: UpdateEstudianteClaseDto) {
    await this.findOne(id);
    try {
      const result = await this.estudianteClaseRepository.update(
        { idEstudianteClase: id },
        { ...updateEstudianteClaseDto, idEstudianteClase: id },
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
    const r = await this.estudianteClaseRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe respuestapara ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
