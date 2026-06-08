import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser,
  CommonModule
} from '@angular/common';

import { TareasService }
from '../../../core/services/tareas.service';

@Component({
  selector: 'app-informatico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informatico.html',
  styleUrls: ['./informatico.css']
})
export class Informatico implements AfterViewInit {

  map: any;

  tareas: any[] = [];

  miLat: number | null = null;
  miLng: number | null = null;

  L: any;

  constructor(

    private tareasService: TareasService,

    @Inject(PLATFORM_ID)
    private platformId: Object

  ) {}

  async ngAfterViewInit(): Promise<void> {

    // SOLO navegador
    if (isPlatformBrowser(this.platformId)) {

      // Import dinámico
      this.L = await import('leaflet');

      this.iniciarMapa();

      this.cargarTareas();

    }

  }

  iniciarMapa(): void {

    delete this.L.Icon.Default.prototype._getIconUrl;

    this.L.Icon.Default.mergeOptions({

      iconRetinaUrl:
        'marker-icon-2x.png',

      iconUrl:
        'marker-icon.png',

      shadowUrl:
        'marker-shadow.png',

    });

    this.map = this.L.map(
      'mapa-informatico'
    ).setView(
      [28.4874, -16.3159],
      13
    );

    this.L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {

        maxZoom: 19,

        attribution:
          '&copy; OpenStreetMap'

      }
    ).addTo(this.map);

    setTimeout(() => {

      this.map.invalidateSize();

    }, 100);

    navigator.geolocation
      .getCurrentPosition(

        (pos) => {

          this.miLat =
            pos.coords.latitude;

          this.miLng =
            pos.coords.longitude;

          this.L.marker([
            this.miLat,
            this.miLng
          ])
          .addTo(this.map)
          .bindPopup('Mi ubicación');

          this.map.setView(
            [
              this.miLat,
              this.miLng
            ],
            15
          );

        }

      );

  }

  cargarTareas(): void {

    this.tareasService
      .listarTareas()
      .subscribe({

        next: (data: any) => {

          this.tareas = data;

          this.pintarTareas();

        },

        error: (err: any) => {

          console.error(err);

        }

      });

  }

   pintarTareas(): void {

    this.tareas.forEach((t) => {

      if (t.latitud && t.longitud) {

        this.L.marker([
          t.latitud,
          t.longitud
        ])
        .addTo(this.map)
        .bindPopup(`
          <b>${t.nombre}</b>
          <br>
          ${t.descripcion}
        `);

      }

    });

  }

  aceptarTarea(t: any): void {

    const idInformatico = 1;

    this.tareasService
      .aceptarTarea(
        t.id_tarea,
        idInformatico
      )
      .subscribe({

        next: () => {

          alert(
            `Has aceptado la tarea: ${t.nombre}`
          );

          this.cargarTareas();

        },

        error: (err: any) => {

          console.error(err);

        }

      });

  }

}