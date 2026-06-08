import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  TareasService
} from '../../../core/services/tareas.service';

import {
  InformaticosService
} from '../../../core/services/informaticos.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class Empresa implements OnInit {

  tareas: any[] = [];

  informaticos: any[] = [];

  nuevoInformatico = {

    nombre: '',

    email: ''

  };

  constructor(

    private tareasService: TareasService,

    private informaticosService: InformaticosService

  ) {}

  ngOnInit(): void {

    this.cargarTareas();

    this.cargarInformaticos();

  }

  cargarTareas(): void {

    this.tareasService
      .listarTareas()
      .subscribe({

        next: (data: any) => {

          this.tareas = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cargarInformaticos(): void {

    this.informaticosService
      .listarInformaticos()
      .subscribe({

        next: (data: any) => {

          this.informaticos = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  crearInformatico(): void {

    if (
      !this.nuevoInformatico.nombre ||
      !this.nuevoInformatico.email
    ) {

      alert('Completa todos los campos');

      return;

    }

    this.informaticosService
      .crearInformatico(this.nuevoInformatico)
      .subscribe({

        next: () => {

          alert(
            'Informático añadido correctamente'
          );

          this.cargarInformaticos();

          this.nuevoInformatico = {

            nombre: '',

            email: ''

          };

        },

        error: (err) => {

          console.error(err);

          alert(
            'Error al crear informático'
          );

        }

      });

  }

}