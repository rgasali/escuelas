import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteClaseService } from './estudiante-clase.service';

describe('EstudianteClaseService', () => {
  let service: EstudianteClaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudianteClaseService],
    }).compile();

    service = module.get<EstudianteClaseService>(EstudianteClaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
