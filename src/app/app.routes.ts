import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { routeGuard } from "./helpers/route.guard";
import { roleGuard } from "./helpers/role.guard";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth-route").then((a) => a.authRoutes),
  },
  {
    path: "dashboard",
    canActivate: [routeGuard],
    loadComponent: () =>
      import("./dashboard.component").then((a) => a.DashboardComponent),
  },
  {
    path: "books",
    canActivate: [roleGuard],
    data: { roles: ["admin"] },
    loadChildren: () => import("./book/book-routes").then((a) => a.bookRoutes),
  },
  {
    path: "unauthorized",
    loadComponent: () =>
      import("./unhauthorized.component").then((a) => a.UnhauthorizedComponent),
  },
  {
    path: "**",
    loadComponent: () =>
      import("../app/not-found/not-found-component").then(
        (a) => a.NotFoundComponent
      ),
  },
];
