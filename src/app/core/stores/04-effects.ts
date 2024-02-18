import { User } from '../models/user.model';
import { Injectable, inject } from "@angular/core";
import * as UsersAction from './01-actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../services/user.service";
import { errorSweetAlert, successSweetAlert } from '../../shared/helpers/sweet.alert';

@Injectable()
export class AppEffects {
  private readonly actions$: Actions = inject(Actions);
  userService: UserService = inject(UserService);


  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      tap((val) => console.log('actions: ',val)),
      ofType(UsersAction.loadUsers),
      mergeMap(() => this.userService.retrieveAll().pipe(
        map((users:User[])=> UsersAction.loadUsersSuccess({users})),
        catchError(error=> of(UsersAction.loadUsersFail({error: error.body.error})))
      ))
    )
  );
  // showNotification$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UsersAction.RootActions.showAlert),
  //     exhaustMap(({type_alert,text, title}) => {
  //       return type_alert === 'fail'? errorSweetAlert(title,text): successSweetAlert(title,text)
  //     })
  //   )
  // );
}