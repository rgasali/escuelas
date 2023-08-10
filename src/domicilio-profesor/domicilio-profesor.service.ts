import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDomicilioProfesorDto } from './dto/create-domicilio-profesor.dto';
import { UpdateDomicilioProfesorDto } from './dto/update-domicilio-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomicilioProfesor } from './entities/domicilio-profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DomicilioProfesorService {
  constructor(
    @InjectRepository(DomicilioProfesor)
    private readonly domicilioProfesorRepository: Repository<DomicilioProfesor>,
  ) {}

  create(domicilioProfesorDto: CreateDomicilioProfesorDto) {
    const d = this.domicilioProfesorRepository.create(domicilioProfesorDto);
    return this.domicilioProfesorRepository.save(d);
  }

  findAll(): Promise<DomicilioProfesor[]> {
    return this.domicilioProfesorRepository.find();
  }

  async findOne(id: number) {
    const d = await this.domicilioProfesorRepository.findOneBy({
      idDomicilioProfesor: id,
    });
    if (d) return d;

    throw new HttpException(
      'No existe un domicilio con es id',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(
    id: number,
    updateDomicilioProfesorDto: UpdateDomicilioProfesorDto,
  ) {
    await this.findOne(id);
    try {
      const result = await this.domicilioProfesorRepository.update(
        { idDomicilioProfesor: id },
        { ...updateDomicilioProfesorDto, idDomicilioProfesor: id },
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
    const d = await this.domicilioProfesorRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${d.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (d.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      'No existe domicilio con ese id',
      HttpStatus.NOT_FOUND,
    );
  }
}
