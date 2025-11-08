import { Routes } from '@angular/router';

export const veiculoRoutes: Routes = [
  { path: '', title: 'Lista de Veículos', loadComponent: ()=> import('./veiculo-list/veiculo-list.component').then((p)=> p.VeiculoListComponent)},
  { path: 'editar/:id', title: 'Editar Veículo', loadComponent: ()=> import('./veiculo-form/veiculo-form.component').then((p)=> p.VeiculoFormComponent)},
  { path: 'new', title: 'Novo Veículo', loadComponent: ()=> import('./veiculo-form/veiculo-form.component').then((p)=> p.VeiculoFormComponent)},
];
