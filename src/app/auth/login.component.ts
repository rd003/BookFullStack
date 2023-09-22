import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginFormComponent } from './ui/login-form.component';
import { LoginModel } from './data/login.model';
import { LoginService } from './data/auth.service';

@Component({
  selector: 'angular-monorepo-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: ` <auth-login-form (submit)="onSubmit($event)" /> `,
  styles: [
    `
      :host {
        padding: 20px 10px;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _loginService = inject(LoginService);
  onSubmit(loginData: LoginModel) {
    // why is it logging two values
    //console.log(loginData);
  }

  constructor() {
    // const user$ = this._loginService.login();
    // user$.subscribe({
    //   next: (data) => console.log(data),
    //   error: (err) => console.log(err),
    // });
  }
}
