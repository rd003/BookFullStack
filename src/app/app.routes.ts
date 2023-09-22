import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-route').then((a) => a.authRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/not-found/not-found-component').then(
        (a) => a.NotFoundComponent
      ),
  },
];
