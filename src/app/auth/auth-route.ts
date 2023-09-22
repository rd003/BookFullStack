import { Route } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
