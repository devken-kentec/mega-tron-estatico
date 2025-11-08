import { Routes } from '@angular/router';

export const menuRoutes: Routes = [
  { path: '', title: 'Menu', loadComponent: ()=> import('./menu-form.component').then((p)=> p.MenuFormComponent)}
];
