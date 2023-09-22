import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Book } from "../data/book.model";
import { JsonPipe } from "@angular/common";
@Component({
  selector: "app-book-list",
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <table mat-table [dataSource]="books" class="mat-elevation-z8">
      <!-- Position Column -->
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let element">{{ element.Title }}</td>
      </ng-container>

      <ng-container matColumnDef="author">
        <th mat-header-cell *matHeaderCellDef>Author</th>
        <td mat-cell *matCellDef="let element">{{ element.Author }}</td>
      </ng-container>
      <ng-container matColumnDef="language">
        <th mat-header-cell *matHeaderCellDef>Language</th>
        <td mat-cell *matCellDef="let element">{{ element.Language }}</td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Price</th>
        <td mat-cell *matCellDef="let element">{{ element.Price }}</td>
      </ng-container>

      <ng-container matColumnDef="pages">
        <th mat-header-cell *matHeaderCellDef>Pages</th>
        <td mat-cell *matCellDef="let element">{{ element.Pages }}</td>
      </ng-container>

      <ng-container matColumnDef="year">
        <th mat-header-cell *matHeaderCellDef>Year</th>
        <td mat-cell *matCellDef="let element">{{ element.Year }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let element">
          <button type="button" mat-mini-fab color="secondary">
            <mat-icon>edit</mat-icon>
          </button>
          <button type="button" mat-mini-fab color="warn">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  @Input({ required: true }) books!: Book[];
  displayedColumns = [
    "title",
    "author",
    "language",
    "price",
    "pages",
    "year",
    "actions",
  ];
}
