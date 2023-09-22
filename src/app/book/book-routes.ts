import { Route } from "@angular/router";
import { BookComponent } from "./book.component";
import { BookDetailComponent } from "./book-detail.component";

export const bookRoutes: Route[] = [
  {
    path: "",
    component: BookComponent,
  },
  {
    path: ":id",
    component: BookDetailComponent,
  },
];
