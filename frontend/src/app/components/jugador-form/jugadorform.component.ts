import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../model/equipo.model';
@Component({
  selector: 'app-jugador-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jugadorform.component.html',
  styleUrl: './jugadorform.component.css'
})
export class JugadorFormComponent implements OnInit {
  jugadorForm!: FormGroup;
  equipos = signal<Equipo[]>([]);
  mensaje = signal<string>('');
  error = signal<boolean>(false);
  constructor(
    private fb: FormBuilder,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // ✅ Formulario reactivo con validaciones
    this.jugadorForm = this.fb.group({
      nombre:   ['', [Validators.required, Validators.minLength(2)]],
      posicion: ['', Validators.required],
      dorsal:   [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      altura:   [null, [Validators.required, Validators.min(1.0), Validators.max(2.50)]],
      equipoId: [null, Validators.required]
    });
    // Cargar equipos para el select
    this.equipoService.getEquipos().subscribe({
      next: (data) => this.equipos.set(data),
      error: (err) => console.error('Error cargando equipos:', err)
    });
  }
  onSubmit(): void {
    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      return;
    }
    this.jugadorService.createJugador(this.jugadorForm.value).subscribe({
      next: () => {
        this.mensaje.set('✅ Jugador creado correctamente');
        this.error.set(false);
        this.jugadorForm.reset();
        // Redirigir tras 1.5s
        setTimeout(() => this.router.navigate(['/jugadores']), 1500);
      },
      error: (err) => {
        console.error('Error al crear jugador:', err);
        this.mensaje.set('❌ Error al crear el jugador');
        this.error.set(true);
      }
    });
  }
}
