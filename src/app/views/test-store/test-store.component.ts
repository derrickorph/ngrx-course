import { Component, OnInit, Signal, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
// import { changeIsAdmin, changeUsername, initAction } from '../../core/states/01-action';
// import * as RootActions from '../../core/states/01-action';
import { CommonModule } from '@angular/common';
import { State } from '../../core/stores/00-reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { getError, getIsLoaded, getUser, getUsers } from '../../core/stores/02-selectors';
import { RootActions, loadUsers } from '../../core/stores/01-actions';
import { User } from '../../core/models/user.model';
import { merge, startWith, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { ErrorType } from '../../shared/constantes/error.contante';


@Component({
  selector: 'app-test-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-store.component.html',
  styleUrl: './test-store.component.css',
})
export class TestStoreComponent implements OnInit {
  // public user: Observable<User> = {} as Observable<User>;
  store: Store<State> = inject(Store);

  userService: UserService = inject(UserService);

  user = toSignal(this.store.pipe(select(getUser)));
  isLoaded: Signal<boolean | undefined> = toSignal(this.store.pipe(select(getIsLoaded)));
  errorMessage: Signal<ErrorType | undefined> = toSignal(this.store.pipe(select(getError)));

  users: Signal<User[] | undefined> = toSignal(
    merge().pipe(
      startWith(void 0),
      switchMap(() => this.store.pipe(select(getUsers)))
    )
  );

  ngOnInit(): void {
    // this.store.dispatch(RootActions.initAction());
    this.store.dispatch(RootActions.initApp());

    // this.user = this.store.select((state: any) => state.root.user)
    // this.user = this.store.pipe(select((state: State) => state.root.user));
  }

  changeUsername = (): void => {
    this.store.dispatch(
      RootActions.changeUsername({ username: `Derrick ${Math.random()}` })
    );
    this.store.dispatch(RootActions.changeIsAdmin({ isAdmin: false }));
  };
  loadUsers = (): void => {
    this.store.dispatch(loadUsers());
  };
}
