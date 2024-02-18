import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/layouts/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'test-store',
        loadComponent: () =>
          import('./views/test-store/test-store.component').then(
            (m) => m.TestStoreComponent
          ),
      },
      {
        path: 'books',
        loadComponent: () =>
          import('./views/book/book.component').then(
            (m) => m.BookComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/authentication/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
