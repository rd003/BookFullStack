import { Route } from "@angular/router";
import { BookPublicComponent } from "./book-public.component";
import { BookDetailPublicComponent } from "./book-detail-public.component";

export const book_public_routes: Route[] = [
  {
    path: "",
    component: BookPublicComponent,
  },
  {
    path: ":id",
    component: BookDetailPublicComponent,
  },
];
