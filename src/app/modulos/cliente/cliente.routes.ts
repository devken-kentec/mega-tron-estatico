import { Routes } from '@angular/router';

export const clienteRoutes: Routes = [
  { path: '', title: 'Lista de Clientes', loadComponent: ()=> import('./cliente-list/cliente-list.component').then((p)=> p.ClienteListComponent)},
  { path: 'editar/:id', title: 'Editar Cliente', loadComponent: ()=> import('./cliente-form/cliente-form.component').then((p)=> p.ClienteFormComponent)},
  { path: 'new', title: 'Novo Cliente', loadComponent: ()=> import('./cliente-form/cliente-form.component').then((p)=> p.ClienteFormComponent)},
];
