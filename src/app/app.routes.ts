import { Routes } from '@angular/router';

export const routes: Routes = [
  { path:'menu', title: 'Menu', loadChildren: () => import('./modulos/menu/menu-form/menu.routes').then(p => p.menuRoutes) },
  { path:'home', title: 'Home', loadChildren: () => import('./modulos/home/home.routes').then(p => p.homeRoutes) },
  { path:'clientes', title: 'Clientes', loadChildren: () => import('./modulos/cliente/cliente.routes').then(p => p.clienteRoutes) },
  { path:'veiculos', title: 'Veículos', loadChildren: () => import('./modulos/veiculo/veiculo.routes').then(p => p.veiculoRoutes) },
  { path:'dados-veiculo', title: 'Dados Veículo', loadChildren: () => import('./modulos/dados-veiculo/dados-veiculo.routes').then(p => p.dadosVeiculoRoutes) },
];
