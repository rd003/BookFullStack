import { ApplicationConfig, ErrorHandler, isDevMode } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { authFeatureKey, authReducer } from "./auth/state/auth.reducers";
import { AuthEffects } from "./auth/state/auth.effects";
import { GlobalErrorHandler } from "./helpers/global-error-handler";
import { errorInterceptor } from "./helpers/error-interceptor";
import { bookFeatureKey, bookReducer } from "./book/state/book.reducer";
import { BookEffects } from "./book/state/book.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { authInterceptor } from "./helpers/auth.interceptor";

const reducers = {
  [authFeatureKey]: authReducer,
  [bookFeatureKey]: bookReducer,
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([errorInterceptor, authInterceptor])),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([AuthEffects, BookEffects]),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
