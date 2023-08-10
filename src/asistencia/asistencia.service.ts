import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ) {}

  create(asistenciaDto: CreateAsistenciaDto) {
    const a = this.asistenciaRepository.create(asistenciaDto);
    return this.asistenciaRepository.save(a);
  }

  findAll(): Promise<Asistencia[]> {
    return this.asistenciaRepository.find();
  }

  async findOne(id: number) {
    const a = await this.asistenciaRepository.findOneBy({ idAsistencia: id });
    if (a) return a;

    throw new HttpException(
      'No se encontro asistencia con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    await this.findOne(id);
    try {
      const result = await this.asistenciaRepository.update(
        { idAsistencia: id },
        { ...updateAsistenciaDto, idAsistencia: id },
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
    const r = await this.asistenciaRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe asistencia con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
