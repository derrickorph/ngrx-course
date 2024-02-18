import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromBook from './core/stores/book/reducers/book.reducer';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { ROOT_FEATURE_KEY, metaReducers, rootReducer } from './core/stores/00-reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppEffects } from './core/stores/04-effects';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Data } from './shared/api/data';
import { provideHttpClient } from '@angular/common/http';
import { BookEffects } from './core/stores/book/effects/book.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(Data)),
    provideStore(
      { [ROOT_FEATURE_KEY]: rootReducer, [fromBook.booksFeatureKey]: fromBook.reducer },
      {
        metaReducers,
        runtimeChecks: {
          strictActionTypeUniqueness: true,
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    provideEffects([AppEffects, BookEffects]),
    provideStoreDevtools({
      name: 'Ngrx Starter',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
