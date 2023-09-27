import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { LoginFormComponent } from "./ui/login-form.component";
import { LoginModel } from "./data/login.model";
import { Store } from "@ngrx/store";
import authActions from "./state/auth.actions";
import {
  selectLoginErrorState,
  selectLoginLoadingState,
} from "./state/auth.selectors";
import { AsyncPipe, NgIf } from "@angular/common";
import { map } from "rxjs";

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
  private store = inject(Store);

  loading$ = this.store.select(selectLoginLoadingState);
  error$ = this.store
    .select(selectLoginErrorState)
    .pipe(map((d) => d?.message));

  onSubmit(loginData: LoginModel) {
    this.store.dispatch(authActions.login({ login: loginData }));
  }
}
