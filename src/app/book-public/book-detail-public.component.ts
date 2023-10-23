import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectBookById } from "../book/state/book.selectors";

@Component({
  selector: "app-book-detail-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: `
    <ng-container *ngIf="book$ | async as book">
      {{ book }}
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPublicComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);
  id$ = this.route.paramMap.pipe(map((a) => a.get("id")));
  book$ = this.id$.pipe(
    switchMap((id) => {
      if (!id) return of(null);
      return this.store.select(selectBookById({ id }));
    })
  );
  // retrieve book by id from store
  ngOnInit(): void {}
}
