import { props } from '@ngrx/store';
import { Action, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { RootActions, loadUsers, loadUsersFail, loadUsersSuccess } from './01-actions';
import { User } from '../models/user.model';

import { ErrorType } from '../../shared/constantes/error.contante';

export const ROOT_FEATURE_KEY = 'root';

export interface RootState {
  appName: string;
  user: User;
  users: User[];
  loaded?: boolean;
  error?: ErrorType;
}
export interface State {
  readonly [ROOT_FEATURE_KEY]: RootState;
}

const initialState: RootState = {
  appName: 'NgRx',
  user: {
    username: '',
    isAdmin: false,
  },
  users:[],
};

const log = (reducer: ActionReducer<State>): ActionReducer<State> => {
  return (state, action) => {
    const currentState = reducer(state, action);

    console.groupCollapsed(action.type)
    console.log('Etat précédent : ', state);
    console.log('Action : ', action);
    console.log('Etat suivant : ', currentState);
    console.groupEnd()

    return currentState;
  };
};

export const metaReducers: MetaReducer[] = [log];

export const rootReducer = createReducer<RootState, Action>(
  initialState,
  on(RootActions.initApp, (state: RootState) => {
    return {
      ...state,
      user: {
        ...state.user,
        isAdmin: true,
      },
    };
  }),
  on(RootActions.changeUsername, (state: RootState, props) => {
    return {
      ...state,
      user: {
        ...state.user,
        username: props.username,
      },
    };
  }),
  on(RootActions.changeIsAdmin, (state: RootState, props) => {
    return {
      ...state,
      user: {
        ...state.user,
        isAdmin: props.isAdmin,
      },
    };
  }),
  on(loadUsers, (state: RootState) => {
    return {
      ...state,
      loaded: false
    };
  }),
  on(loadUsersSuccess, (state: RootState, props) => {
    return {
      ...state,
      users: props.users,
      loaded: true,
    };
  }),
  on(loadUsersFail, (state: RootState, props) => {
    return {
      ...state,
      users: [],
      loaded: true,
      error: props.error,
    };
  }),
);
