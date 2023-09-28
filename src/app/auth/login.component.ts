import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { LoginFormComponent } from "./ui/login-form.component";
import { LoginModel } from "./data/login.model";
import { Store } from "@ngrx/store";
import authActions from "./state/auth.actions";
import {
  selectLoginErrorState,
  selectLoginLoadingState,
  selectLoginState,
} from "./state/auth.selectors";
import { AsyncPipe, NgIf } from "@angular/common";
import { map, tap } from "rxjs";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "angular-monorepo-login",
  standalone: true,
  imports: [LoginFormComponent, NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="loading$ | async as loading">
      {{ loading }}
    </ng-container>

    <ng-container *ngIf="error$ | async as error">
      {{ error }}
    </ng-container>
    <auth-login-form (submit)="onSubmit($event)" />
  `,
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
  store = inject(Store);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

  loading$ = this.store.select(selectLoginLoadingState);
  error$ = this.store
    .select(selectLoginErrorState)
    .pipe(map((d) => d?.message));

  isLoggedIn$ = this.store.select(selectLoginState);

  onSubmit(loginData: LoginModel) {
    this.store.dispatch(authActions.login({ login: loginData }));
    this.snackbar.open("Suceessfully logged in", "dismis", {
      duration: 1000,
    });
    //TODO: Reset form if authentication failed.
  }

  constructor() {
    this.isLoggedIn$
      .pipe(
        tap((loggedIn) => {
          if (loggedIn) {
            this.router.navigate(["/books"]);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
