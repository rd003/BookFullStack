import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from "@angular/core";
import { Book } from "../book/data/book.model";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-book-detail-public",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPublicComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);
  id$ = this.route.paramMap.pipe(map((a) => a.get("id")));
  book$ = this.id$.pipe(switchMap((id) => this.store.select(SelectBook)));
  // retrieve book by id from store
  ngOnInit(): void {}
}
