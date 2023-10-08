import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-book-filter-public",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <div class="book-filters">
      <mat-form-field appearance="outline">
        <mat-label>Filter by Title/Author</mat-label>
        <input matInput />
      </mat-form-field>
    </div>
  `,
  styles: [
    `
      .book-filters {
        padding-top: 10px;
        padding-left: 50px;
        width: 100%;
      }
      mat-form-field {
        width: 500px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilterPublicComponent {}
