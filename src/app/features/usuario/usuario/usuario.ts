import {
  Component,
  AfterViewInit
} from '@angular/core';

import * as L from 'leaflet';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TareasService } from '../../../core/services/tareas.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css']
})
export class Usuario implements AfterViewInit {

  map!: L.Map;
  marker!: L.Marker;

  latitud: number | null = null;
  longitud: number | null = null;

  tarea = {
    nombre: '',
    descripcion: '',
    latitud: null as number | null,
    longitud: null as number | null
  };

  constructor(private tareasService: TareasService) {}

  ngAfterViewInit(): void {
    this.iniciarMapa();
  }

  iniciarMapa(): void {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'marker-icon-2x.png',
      iconUrl: 'marker-icon.png',
      shadowUrl: 'marker-shadow.png',
    });

    // Crear mapa
    this.map = L.map('mapa-usuario', {
      zoomControl: true
    }).setView([28.4874, -16.3159], 13);

    // Tiles
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }
    ).addTo(this.map);

    // Arregla render incorrecto
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);

    // Click en mapa
    this.map.on('click', (e: L.LeafletMouseEvent) => {

      this.latitud = e.latlng.lat;
      this.longitud = e.latlng.lng;

      this.tarea.latitud = this.latitud;
      this.tarea.longitud = this.longitud;

      // Reutiliza marker
      if (this.marker) {

        this.marker.setLatLng([
          this.latitud,
          this.longitud
        ]);

      } else {

        this.marker = L.marker([
          this.latitud,
          this.longitud
        ]).addTo(this.map);

      }

    });
  }

  crearTarea(): void {

    this.tareasService.crearTarea(this.tarea)
      .subscribe({

        next: (res) => {

          alert('Tarea creada correctamente');

          console.log('Respuesta backend:', res);

          // Limpiar formulario
          this.tarea = {
            nombre: '',
            descripcion: '',
            latitud: null,
            longitud: null
          };

        },

        error: (err) => {

          console.error(err);

          alert('Error al crear tarea');

        }

      });
  }
}