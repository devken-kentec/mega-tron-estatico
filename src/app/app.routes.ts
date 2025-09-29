import { Routes } from '@angular/router';

export const routes: Routes = [
  { path:'home', title: 'Home', loadChildren: () => import('./modulos/home/home.routes').then(p => p.homeRoutes) },
  { path:'clientes', title: 'Clientes', loadChildren: () => import('./modulos/cliente/cliente.routes').then(p => p.clienteRoutes) }
];
