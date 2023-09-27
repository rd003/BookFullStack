import { ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
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

const reducers = {
  [authFeatureKey]: authReducer,
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([AuthEffects]),
  ],
};
