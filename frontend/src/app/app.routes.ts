import { Routes } from '@angular/router';
import { EquipoListComponent } from './components/equipo-list/equipolist.component';
import { EquipoDetailComponent } from './components/equipo-detail/equipodetail.component';
import { JugadorFormComponent } from './components/jugador-form/jugadorform.component';
import { JugadorListComponent } from './components/jugador-list/jugadorlist.component';
import { EquipoFormComponent } from './components/equipo-form/equipoform.component';
export const routes: Routes = [
  { path: '', redirectTo: 'equipos', pathMatch: 'full' },
  { path: 'equipos', component: EquipoListComponent },
  { path: 'equipos/nuevo', component: EquipoFormComponent },
  { path: 'equipos/:id', component: EquipoDetailComponent },
  { path: 'jugadores', component: JugadorListComponent },
  { path: 'jugadores/nuevo', component: JugadorFormComponent },
  { path: '**', redirectTo: 'equipos' }
];
