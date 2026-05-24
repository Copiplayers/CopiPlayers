import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../model/jugador.model';
@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadorlist.component.html'
})
export class JugadorListComponent implements OnInit {
  jugadores = signal<Jugador[]>([]);
  constructor(private jugadorService: JugadorService) {}
  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data) => this.jugadores.set(data),
      error: (err) => console.error('Error al cargar jugadores:', err)
    });
  }
}
