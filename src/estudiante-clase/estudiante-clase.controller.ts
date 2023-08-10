import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstudianteClaseService } from './estudiante-clase.service';
import { CreateEstudianteClaseDto } from './dto/create-estudiante-clase.dto';
import { UpdateEstudianteClaseDto } from './dto/update-estudiante-clase.dto';

@Controller('estudiante-clase')
export class EstudianteClaseController {
  constructor(
    private readonly estudianteClaseService: EstudianteClaseService,
  ) {}

  @Post()
  create(@Body() createEstudianteClaseDto: CreateEstudianteClaseDto) {
    return this.estudianteClaseService.create(createEstudianteClaseDto);
  }

  @Get()
  findAll() {
    return this.estudianteClaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteClaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstudianteClaseDto: UpdateEstudianteClaseDto,
  ) {
    return this.estudianteClaseService.update(+id, updateEstudianteClaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteClaseService.remove(+id);
  }
}
