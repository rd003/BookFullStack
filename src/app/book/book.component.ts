import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookFilterComponent } from "./ui/book-filter.component";
import { BookListComponent } from "./ui/book-list.component";
import { Book } from "./data/book.model";

@Component({
  selector: "app-book",
  standalone: true,
  imports: [CommonModule, BookFilterComponent, BookListComponent],
  template: `
    <h1>Books</h1>
    <app-book-filter />
    <app-book-list [books]="books" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
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
