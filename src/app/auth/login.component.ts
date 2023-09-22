import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { LoginFormComponent } from "./ui/login-form.component";
import { LoginModel } from "./data/login.model";
import { LoginService } from "./data/auth.service";
import { catchError, of, tap, throwError } from "rxjs";

@Component({
  selector: "angular-monorepo-login",
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
  onSubmit(loginData: LoginModel) {}

  constructor() {
    // const user$ = this._loginService
    //   .login({
    //     username: "ravindra",
    //     password: "ravindra@123",
    //   })
    //   .pipe(
    //     tap(console.log),
    //     catchError((error) => {
    //       console.log(error);
    //       return of(error);
    //     })
    //   );
    // user$.subscribe();

    const books$ = this._loginService.books().pipe(
      tap((books) => console.log(books)),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
    books$.subscribe();
  }
}
