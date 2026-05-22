import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../model/jugador.model';

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jugadorlist.component.html',
  styleUrl: './jugadorlist.component.css'
})
export class JugadorListComponent implements OnInit {
  jugadores = signal<Jugador[]>([]);

  // 1. NUEVO: Signal para almacenar el texto que teclea el usuario
  searchTerm = signal<string>('');

  // 2. NUEVO: Computed que filtra los jugadores en tiempo real (por nombre o posición)
  filteredJugadores = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.jugadores(); // Si no hay búsqueda, devuelve la lista completa
    }

    // Lista de tus posiciones oficiales en minúsculas
    const posicionesOficiales = ['base', 'alero', 'escolta', 'pívot', 'pivot', 'ala-pívot', 'ala-pivot'];

    // Si el término coincide exactamente con el inicio de una posición, filtramos SOLO por posición
    const esBusquedaDePosicion = posicionesOficiales.some(pos => pos.startsWith(term));

    if (esBusquedaDePosicion) {
      return this.jugadores().filter(jugador =>
        jugador.posicion.toLowerCase().includes(term)
      );
    } else {
      // Si está escribiendo un nombre (o cualquier otra cosa), filtramos ESTRICTAMENTE por nombre
      return this.jugadores().filter(jugador =>
        jugador.nombre.toLowerCase().includes(term)
      );
    }
  });

  constructor(private jugadorService: JugadorService) {}

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data) => this.jugadores.set(data),
      error: (err) => console.error('Error al cargar jugadores:', err)
    });
  }

  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data) => this.jugadores.set(data),
      error: (err) => console.error('Error al cargar jugadores:', err)
    });
  }

  // 3. NUEVO: Método para capturar el evento de escritura del teclado
  updateSearchTerm(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  // Tu método definitivo para eliminar, intacto
  eliminar(id: number, nombre: string): void {
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`);

    if (confirmar) {
      this.jugadorService.eliminarJugador(id).subscribe({
        next: () => {
          alert('Jugador eliminado con éxito');
          // Súper optimización: Filtramos el jugador eliminado directamente de la Signal
          this.jugadores.set(this.jugadores().filter(j => j.id !== id));
        },
        error: (err) => {
          console.error('Error al eliminar jugador:', err);
          alert('No se pudo eliminar al jugador');
        }
      });
    }
  }
}
