import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from "@angular/core";
import { BookFilterComponent } from "./ui/book-filter.component";
import { BookListComponent } from "./ui/book-list.component";
import { Book } from "./data/book.model";
import { BookPaginatorComponent } from "./ui/book-paginator.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { BookDialogComponent } from "./ui/book-dialog-component";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-book",
  standalone: true,
  imports: [
    BookFilterComponent,
    BookListComponent,
    BookPaginatorComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  template: `
    <h1>Books</h1>
    <p>
      <button
        type="button"
        (click)="onAddUpdate('Add', null)"
        mat-raised-button
        color="accent"
      >
        +
      </button>
    </p>
    <app-book-filter
      (onLanguageSelect)="onLanguageSelect($event)"
      (onSearchTermChange)="onSearchTermChange($event)"
      [languages]="['Hindi', 'English', 'Italian', 'French', 'Sanskrit']"
    />
    <app-book-list
      [books]="books"
      (edit)="onAddUpdate('Edit', $event)"
      (delete)="onDelete($event)"
    />
    <app-book-paginator
      [totalRecords]="103"
      (pageSelect)="onPageSelect($event)"
    />
  `,
  styles: [
    `
      :host {
        padding: 15px 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent implements OnDestroy {
  dialog = inject(MatDialog);
  destroyed$ = new Subject<boolean>();

  onAddUpdate(action: string, book: Book | null = null) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: { book, title: action + " Book" },
    });

    dialogRef.componentInstance.sumbit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((submittedBook) => {
        console.log(submittedBook);
        if (!submittedBook) return;
        if (submittedBook.Id) {
          //add book
        } else {
          //update book
          //
        }
        // TODO: lines below only executed, when we have added books successfully
        dialogRef.componentInstance.bookForm.reset();
        dialogRef.componentInstance.onCanceled();
      });
  }

  onPageSelect(pageObj: { page: number; limit: number }) {
    console.log(pageObj);
  }

  onLanguageSelect(languages: string[] | null) {
    console.log(languages);
  }

  onSearchTermChange(searchTerm: string | null) {
    console.log(searchTerm);
  }

  onDelete(book: Book) {
    if (window.confirm(`Are you sure to delete book: ${book.Title}`)) {
      //TODO: delete book here
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  //dummy data

  books: Book[] = [
    {
      Id: "8ef9f86b-cdc4-49ab-88de-f641e8d0ab73",
      Author: "Chinua Achebe",
      Country: "Nigeria",
      ImageLink: "assets/images/things-fall-apart.jpg",
      Language: "English",
      Link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
      Pages: 209,
      Title: "Things Fall Apart",
      Year: 1958,
      Price: 243,
    },
    {
      Id: "ab38cb7b-f4de-4c3f-9463-dcba1bd62f36",
      Author: "Hans Christian Andersen",
      Country: "Denmark",
      ImageLink: "assets/images/fairy-tales.jpg",
      Language: "Danish",
      Link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
      Pages: 784,
      Title: "Fairy tales",
      Year: 1836,
      Price: 101,
    },
    {
      Id: "591806aa-ea46-4f10-a971-dbae6dbf5e5d",
      Author: "Dante Alighieri",
      Country: "Italy",
      ImageLink: "assets/images/the-divine-comedy.jpg",
      Language: "Italian",
      Link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
      Pages: 928,
      Title: "The Divine Comedy",
      Year: 1315,
      Price: 149,
    },
  ];
}
