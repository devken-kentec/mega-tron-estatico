import { Routes } from '@angular/router';

export const dadosVeiculoRoutes: Routes = [
  { path: '', title: 'Lista de Veículos', loadComponent: ()=> import('./dados-veiculos-list/dados-veiculos-list.component').then((p)=> p.DadosVeiculosListComponent)},
  { path: 'editar/:id', title: 'Editar Veículo', loadComponent: ()=> import('./dados-veiculos-form/dados-veiculos-form.component').then((p)=> p.DadosVeiculosFormComponent)},
  { path: 'new', title: 'Novo Veículo', loadComponent: ()=> import('./dados-veiculos-form/dados-veiculos-form.component').then((p)=> p.DadosVeiculosFormComponent)},
];
