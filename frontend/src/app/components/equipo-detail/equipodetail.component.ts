import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../model/equipo.model';
import { Jugador } from '../../model/jugador.model';
@Component({
  selector: 'app-equipo-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipodetail.component.html',
  styleUrl: './equipodetail.component.css'
})
export class EquipoDetailComponent implements OnInit {
  // ✅ Signals
  equipo = signal<Equipo | null>(null);
  jugadores = signal<Jugador[]>([]);
  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.equipoService.getEquipo(id).subscribe({
      next: (data) => this.equipo.set(data),
      error: (err) => console.error('Error al cargar equipo:', err)
    });
    // ✅ Consulta relación 1:M
    this.equipoService.getJugadoresByEquipo(id).subscribe({
      next: (data) => this.jugadores.set(data),
      error: (err) => console.error('Error al cargar jugadores:', err)
    });
  }
}
