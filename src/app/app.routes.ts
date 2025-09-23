import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'clientes', title: 'Clientes', loadChildren: () => import('./modulos/cliente/cliente.routes').then(p => p.clienteRoutes) }
];
