import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) {}

  create(escuelaDto: CreateEscuelaDto) {
    const e = this.escuelaRepository.create(escuelaDto);
    return this.escuelaRepository.save(e);
  }

  findAll(): Promise<Escuela[]> {
    return this.escuelaRepository.find();
  }

  async findOne(id: number) {
    const e = await this.escuelaRepository.findOneBy({ idEscuela: id });
    if (e) return e;

    throw new HttpException(
      'No existe una Escuela con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    await this.findOne(id);
    try {
      const result = await this.escuelaRepository.update(
        { idEscuela: id },
        { ...updateEscuelaDto, idEscuela: id },
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
    const r = await this.escuelaRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe Escuela con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
