import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteClaseController } from './estudiante-clase.controller';
import { EstudianteClaseService } from './estudiante-clase.service';

describe('EstudianteClaseController', () => {
  let controller: EstudianteClaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudianteClaseController],
      providers: [EstudianteClaseService],
    }).compile();

    controller = module.get<EstudianteClaseController>(EstudianteClaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
