import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from "@angular/core";
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
import { Subject, map, takeUntil, tap } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "angular-monorepo-login",
  standalone: true,
  imports: [
    LoginFormComponent,
    NgIf,
    AsyncPipe,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <ng-container *ngIf="loading$ | async as loading">
      <mat-spinner *ngIf="loading"></mat-spinner>
    </ng-container>

    <!-- <ng-container *ngIf="error$ | async as error">
      {{ error }}
    </ng-container> -->
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
  destroyed$ = new Subject<boolean>();
  @ViewChild(LoginFormComponent, { static: true })
  loginFormComponent!: LoginFormComponent;
  loading$ = this.store.select(selectLoginLoadingState);

  error$ = this.store
    .select(selectLoginErrorState)
    .pipe(
      tap((d) => {
        if (d?.message) {
          this.loginFormComponent.resetLoginForm();
          this.snackbar.open(d?.message, "dismis", {
            duration: 1000,
          });
        }
      }),
      takeUntil(this.destroyed$)
    )
    .subscribe();

  isLoggedIn$ = this.store.select(selectLoginState).pipe(
    tap((loggedIn) => {
      if (loggedIn) {
        this.snackbar.open("Suceessfully logged in", "dismis", {
          duration: 1000,
        });
        this.router.navigate(["/dashboard"]);
      }
    }),
    takeUntil(this.destroyed$)
  );

  onSubmit(loginData: LoginModel) {
    this.store.dispatch(authActions.login({ login: loginData }));
    this.isLoggedIn$.subscribe();
    //TODO: Reset form if authentication failed.
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
