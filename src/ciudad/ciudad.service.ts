import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  create(ciudadDto: CreateCiudadDto) {
    const c = this.ciudadRepository.create(ciudadDto);
    return this.ciudadRepository.save(c);
  }

  findAll(): Promise<Ciudad[]> {
    return this.ciudadRepository.find();
  }

  async findOne(id: number) {
    const c = await this.ciudadRepository.findOneBy({ idCiudad: id });
    if (c) return c;

    throw new HttpException(
      'No existe una ciudad con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateCiudadDto: UpdateCiudadDto) {
    await this.findOne(id);
    try {
      const result = await this.ciudadRepository.update(
        { idCiudad: id },
        { ...updateCiudadDto, idCiudad: id },
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
    const r = await this.ciudadRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe ciudad con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
