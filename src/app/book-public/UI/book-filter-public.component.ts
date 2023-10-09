import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-book-filter-public",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <div class="book-filters">
      <mat-form-field appearance="outline">
        <mat-label>Filter by Title/Author</mat-label>
        <input matInput [formControl]="searchTerm" />
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
export class BookFilterPublicComponent {
  @Output() OnBookSearch = new EventEmitter<string>();
  searchTerm = new FormControl<string>("");

  constructor() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(500),
        tap((sTerm) => {
          this.OnBookSearch.emit(sTerm ?? "");
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
