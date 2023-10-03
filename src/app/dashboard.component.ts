import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { selectUserInfo } from "./auth/state/auth.selectors";
import { BookService } from "./book/data/book.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="userInfo$ | async as userInfo">
      <h1>Welcome {{ userInfo.username }}</h1>
    </ng-container>
  `,
  styles: [
    `
      :host {
        margin: 15px 20px;
      }
    `,
  ],
})
export class DashboardComponent {
  store = inject(Store);
  userInfo$ = this.store.select(selectUserInfo);
}
