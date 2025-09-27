import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  { path: '', title: 'Home', loadComponent: ()=> import('./home-form/home-form.component').then((p)=> p.HomeFormComponent)}
];
