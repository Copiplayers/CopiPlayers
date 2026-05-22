import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../model/equipo.model'; // Asegúrate de importar tu interfaz

@Component({
  selector: 'app-equipo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipoform.component.html',
  styleUrl: './equipoform.component.css'
})
export class EquipoFormComponent {
  private fb = inject(FormBuilder);
  private equipoService = inject(EquipoService);
  private router = inject(Router);

  mensaje = signal<string>('');
  error = signal<boolean>(false);

  equipoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    conferencia: ['', Validators.required],
    anioFundacion: ['', [Validators.required, Validators.min(1800), Validators.max(2030)]]
  });

  onSubmit(): void {
    if (this.equipoForm.valid) {
      // Usamos 'Partial<Equipo>' para decir que el objeto NO necesita todas las propiedades (como el id)
      const equipoAEnviar: Partial<Equipo> = {
        nombre: this.equipoForm.value.nombre,
        ciudad: this.equipoForm.value.ciudad,
        conferencia: this.equipoForm.value.conferencia,
        anioFundacion: Number(this.equipoForm.value.anioFundacion)
      };

      // Si tu servicio espera un objeto 'Equipo' completo, podemos hacer un cast forzado
      this.equipoService.createEquipo(equipoAEnviar as Equipo).subscribe({
        next: () => {
          this.mensaje.set('Equipo creado correctamente.');
          this.error.set(false);
          setTimeout(() => this.router.navigate(['/equipos']), 1500);
        },
        error: (err) => {
          console.error('Error del servidor:', err);
          this.mensaje.set('Error: No se pudo crear el equipo.');
          this.error.set(true);
        }
      });
    } else {
      this.equipoForm.markAllAsTouched();
    }
  }
}
