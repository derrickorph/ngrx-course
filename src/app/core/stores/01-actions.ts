import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../models/user.model";
import { ErrorType } from "../../shared/constantes/error.contante";

const INIT_APP = "[Root] Init app"
const CHANGE_USERNAME = "[Root] Change username"
const CHANGE_ISADMIN = "[Root] Change isAdmin"

const LOAD_USERS = "[Users API] load users"
const LOAD_USERS_SUCCESS = "[Users API] load users success"
const LOAD_USERS_FAIL= "[Users API] load users fail"

// export const initAction = createAction(INIT_APP);
// export const changeUsername = createAction(CHANGE_USERNAME, props<{username:string}>());
// export const changeIsAdmin = createAction(CHANGE_ISADMIN, props<{isAdmin:boolean}>());

export const RootActions = createActionGroup({
  source: 'Root',
  events: {
    'Init app': emptyProps(),
    'Change username': props<{username:string}>(),
    'Show alert': props<{title:string, text:string, type_alert:string}>(),
    'Change isAdmin': props<{isAdmin:boolean}>(),
  },
});
// USERS

export const loadUsers = createAction(LOAD_USERS)
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users:User[]}>());
export const loadUsersFail = createAction(LOAD_USERS_FAIL, props<{error:ErrorType}>());