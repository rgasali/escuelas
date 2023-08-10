import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  create(claseDto: CreateClaseDto) {
    const c = this.claseRepository.create(claseDto);
    return this.claseRepository.save(c);
  }

  findAll(): Promise<Clase[]> {
    return this.claseRepository.find();
  }

  async findOne(id: number) {
    const c = await this.claseRepository.findOneBy({ idClase: id });
    if (c) return c;

    throw new HttpException(
      'No existe una clase con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateClaseDto: UpdateClaseDto) {
    await this.findOne(id);
    try {
      const result = await this.claseRepository.update(
        { idClase: id },
        { ...updateClaseDto, idClase: id },
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
    const r = await this.claseRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException('No existe clase con ese id', HttpStatus.NOT_FOUND);
  }
}
