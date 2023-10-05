import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Output,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Book } from "../data/book.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
@Component({
  selector: "app-book-dialog",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h1 mat-dialog-title>
      {{ data.title }}
    </h1>
    <div mat-dialog-content>
      <form [formGroup]="bookForm" class="book-form">
        <input formControlName="id" type="hidden" />
        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput placeholder="title" formControlName="Title" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Author</mat-label>
          <input matInput placeholder="author" formControlName="Author" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Language</mat-label>
          <input matInput placeholder="language" formControlName="Language" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Price</mat-label>
          <input matInput placeholder="price" formControlName="Price" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Pages</mat-label>
          <input matInput placeholder="pages" formControlName="Pages" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Year</mat-label>
          <input matInput placeholder="year" formControlName="Year" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Country</mat-label>
          <input matInput placeholder="country" formControlName="Country" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>link</mat-label>
          <input matInput placeholder="link" formControlName="Link" />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button
        mat-raised-button
        color="primary"
        (click)="onSubmit()"
        [disabled]="bookForm.invalid"
        cdkFocusInitial
      >
        Save
      </button>
      <button mat-raised-button color="warn" (click)="onCanceled()">
        Close
      </button>
    </div>
  `,
  styles: [
    `
      .book-form {
        display: grid;
        grid-template-columns: repeat(
          3,
          1fr
        ); /* Three columns with equal width */
        gap: 16px; /* Adjust the gap between columns as needed */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDialogComponent {
  @Output() sumbit = new EventEmitter<Book>();
  //msg = this.data.message;
  bookForm = new FormGroup({
    id: new FormControl<string | null>(null),
    Title: new FormControl<string>("", Validators.required),
    Author: new FormControl<string>("", Validators.required),
    Country: new FormControl<string>("", Validators.required),
    ImageLink: new FormControl<string>(""),
    Language: new FormControl<string>("", Validators.required),
    Link: new FormControl<string>(""),
    Pages: new FormControl<number>(0, Validators.required),
    Year: new FormControl<number>(0, Validators.required),
    Price: new FormControl<number>(0, Validators.required),
  });

  onCanceled() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.bookForm.valid) {
      const book: Book = Object.assign(this.bookForm.value);
      this.sumbit.emit(book);
    }
  }
  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book | null; title: string }
  ) {
    if (data.book != null) {
      this.bookForm.patchValue(data.book);
    }
  }
}
