import { NgFor } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { catchError, debounceTime, tap, throwError } from "rxjs";

@Component({
  selector: "app-book-filter",
  standalone: true,
  imports: [
    NgFor,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>Search query</mat-label>
      <input matInput [formControl]="searchTerm" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Languages</mat-label>
      <mat-select multiple="true" [formControl]="language">
        <mat-option
          *ngFor="let lang of languages; trackBy: trackByLang"
          [value]="lang"
          >{{ lang }}</mat-option
        >
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 300px;
      }
      :host {
        display: flex;
        gap: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilterComponent {
  @Input({ required: true }) languages!: string[];
  @Output() onSearchTermChange = new EventEmitter<string | null>();
  @Output() onLanguageSelect = new EventEmitter<string[] | null>();
  searchTerm = new FormControl<string>("");
  language = new FormControl<string[]>([]);

  constructor() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        tap((value) => {
          this.onSearchTermChange.emit(value);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
        takeUntilDestroyed()
      )
      .subscribe();

    this.language.valueChanges
      .pipe(
        tap((langs) => {
          this.onLanguageSelect.emit(langs);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  trackByLang(index: number, lang: string) {
    return lang;
  }
}
