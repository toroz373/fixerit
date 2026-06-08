import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TareasService {

  api = 'http://localhost/fixerit/api';

  constructor(private http: HttpClient) {}

  crearTarea(tarea: any): Observable<any> {
    return this.http.post(`${this.api}/crear_tarea.php`, tarea);
  }

  listarTareas(): Observable<any> {
    return this.http.get(`${this.api}/listar_tareas.php`);
  }

  aceptarTarea(id_tarea: number, id_informatico: number): Observable<any> {
    return this.http.post(`${this.api}/aceptar_tarea.php`, {
      id_tarea,
      id_informatico
    });
  }
}
