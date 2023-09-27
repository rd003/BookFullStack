import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Store } from "@ngrx/store";
import authActions from "./auth/state/auth.actions";
import { selectLoginResponseState } from "./auth/state/auth.selectors";
import { tap } from "rxjs";
import { tokenUtils } from "./utils/token.utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: "app-root",
  template: `
    <div class="main">
      <app-header />
      <router-outlet />
      <app-footer />
    </div>
  `,
  styles: [
    `
      .main {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  store = inject(Store);
  loginResponse$ = this.store.select(selectLoginResponseState);

  constructor() {
    // setting loginResponse at app init.
    this.loginResponse$
      .pipe(
        tap((loginResponse) => {
          if (!loginResponse) {
            //retrieve token
            const accessToken = tokenUtils.getToken();
            if (accessToken) {
              // set loginResponse state here on application start
              this.store.dispatch(authActions.loadAuthInfo({ accessToken }));
            }
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
