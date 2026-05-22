import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../model/equipo.model';

@Component({
  selector: 'app-equipo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipolist.component.html',
  styleUrl: './equipolist.component.css'
})
export class EquipoListComponent implements OnInit {
  // ✅ Signal para manejar estado original
  equipos = signal<Equipo[]>([]);

  // 1. NUEVO: Signal para almacenar el texto que escribe el usuario
  searchTerm = signal<string>('');

  // 2. NUEVO: Computed reactivo que filtra automáticamente los equipos
  // Busca coincidencias tanto en el nombre como en la ciudad del equipo
  filteredEquipos = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.equipos(); // Si la barra está vacía, devuelve todos los equipos
    }
    return this.equipos().filter(equipo =>
      equipo.nombre.toLowerCase().includes(term) ||
      equipo.ciudad.toLowerCase().includes(term)
    );
  });

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    // ✅ Observable en el servicio
    this.equipoService.getEquipos().subscribe({
      next: (data) => this.equipos.set(data),
      error: (err) => console.error('Error al cargar equipos:', err)
    });
  }

  // 3. NUEVO: Método para actualizar la señal de búsqueda al teclear
  updateSearchTerm(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  delete(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este equipo? Esta acción no se puede deshacer.')) {
      this.equipoService.deleteEquipo(id).subscribe({
        next: () => {
          // Opción A: Actualizar la señal (la lista se refresca sola)
          this.equipos.update(equiposActuales =>
            equiposActuales.filter(e => e.id !== id)
          );
          console.log('Equipo eliminado con éxito');
          },
        error: (err) => {
          console.error('Error al intentar eliminar:', err);
          alert('No se pudo eliminar el equipo. Inténtalo de nuevo.');
        }
      });
    }
  }
}
