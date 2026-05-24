import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../model/equipo.model';
@Component({
  selector: 'app-equipo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipolist.component.html'
})
export class EquipoListComponent implements OnInit {
  // ✅ Signal para manejar estado
  equipos = signal<Equipo[]>([]);
  constructor(private equipoService: EquipoService) {}
  ngOnInit(): void {
    // ✅ Observable en el servicio
    this.equipoService.getEquipos().subscribe({
      next: (data) => this.equipos.set(data),
      error: (err) => console.error('Error al cargar equipos:', err)
    });
  }
}
