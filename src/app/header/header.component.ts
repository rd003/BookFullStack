import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      <mat-toolbar color="primary">
        <span>Book App 📔</span>
        <span class="example-spacer"></span>
        <button mat-button routerLink="/home" routerLinkActive="active">
          Home
        </button>
        <ng-container *ngIf="isLoggedIn">
          <button mat-button routerLink="/dashboard" routerLinkActive="active">
            Dashboard
          </button>
          <button mat-button routerLink="/books" routerLinkActive="active">
            Books
          </button>

          <button mat-button (click)="logout.emit()" routerLinkActive="active">
            Logout
          </button>
        </ng-container>
        <ng-container *ngIf="!isLoggedIn">
          <button mat-button routerLink="/auth/login" routerLinkActive="active">
            Login
          </button>
          <button
            mat-button
            routerLink="/auth/signup"
            routerLinkActive="active"
          >
            Signup
          </button>
        </ng-container>

        <a
          href=""
          mat-icon-button
          class="example-icon favorite-icon"
          aria-label="Example icon-button with heart icon"
        >
          <mat-icon>favorite</mat-icon>
        </a>
      </mat-toolbar>
    </p>
  `,
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }

      .active {
        background: #003a85;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output() logout = new EventEmitter();
  @Input() isLoggedIn!: boolean;
}
