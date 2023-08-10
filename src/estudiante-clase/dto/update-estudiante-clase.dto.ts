import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteClaseDto } from './create-estudiante-clase.dto';

export class UpdateEstudianteClaseDto extends PartialType(
  CreateEstudianteClaseDto,
) {}
