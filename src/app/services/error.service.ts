import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Observable para que los componentes se suscriban a los errores
  getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  // Método para establecer un nuevo error
  setError(message: string): void {
    this.errorSubject.next(message);
  }

  // Método para limpiar el error actual
  clearError(): void {
    this.errorSubject.next(null);
  }
}