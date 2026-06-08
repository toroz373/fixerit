import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InformaticosService {

  api = 'http://localhost/fixerit/api';

  constructor(private http: HttpClient) {}

  listarInformaticos(): Observable<any> {
    return this.http.get(`${this.api}/listar_informaticos.php`);
  }

  crearInformatico(data: any): Observable<any> {
    return this.http.post(`${this.api}/crear_informatico.php`, data);
  }
}
