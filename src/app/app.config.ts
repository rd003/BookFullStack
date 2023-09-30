import { ApplicationConfig, ErrorHandler } from "@angular/core";
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

const reducers = {
  [authFeatureKey]: authReducer,
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([AuthEffects]),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
