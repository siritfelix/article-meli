import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('debería inicializarse sin errores', () => {
    service.getError().subscribe(error => {
      expect(error).toBeNull();
    });
  });

  it('debería establecer un error correctamente', () => {
    const errorMessage = 'Error de prueba';
    service.setError(errorMessage);

    service.getError().subscribe(error => {
      expect(error).toBe(errorMessage);
    });
  });

  it('debería limpiar el error correctamente', () => {
    service.setError('Error de prueba');
    service.clearError();

    service.getError().subscribe(error => {
      expect(error).toBeNull();
    });
  });
});