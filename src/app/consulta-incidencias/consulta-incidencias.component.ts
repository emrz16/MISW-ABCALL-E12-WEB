import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-incidencias',
  templateUrl: './consulta-incidencias.component.html',
  styleUrl: './consulta-incidencias.component.css'
})
export class ConsultaIncidenciasComponent implements OnInit {
  incidentes: any[] = [
    { nombre: 'Incidente 1', estado: 'Abierto' },
    { nombre: 'Incidente 2', estado: 'En Proceso' },
    { nombre: 'Incidente 3', estado: 'Resuelto' },
    { nombre: 'Incidente 4', estado: 'Abierto' },
    { nombre: 'Incidente 5', estado: 'Resuelto' },
    { nombre: 'Incidente 6', estado: 'En Proceso' },
    { nombre: 'Incidente 7', estado: 'Abierto' },
    { nombre: 'Incidente 8', estado: 'Resuelto' },
    { nombre: 'Incidente 9', estado: 'Abierto' },
  ];

  estados: string[] = ['Abierto', 'En Proceso', 'Resuelto'];
  incidentesFiltrados: any[] = [];
  page: number = 1;

  ngOnInit(): void {
    this.incidentesFiltrados = this.incidentes; // Inicialmente mostrar todos
  }

  filtrarPorEstado(estado: string): void {
    this.incidentesFiltrados = this.incidentes.filter(incidente => incidente.estado === estado);
  }
}
