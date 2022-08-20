import profileReducer, {ProfilePageActionsType} from "./profile-reducer";
import dialogsReducer, {DialogPageActionsType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersPageActionType} from "./users-reducer";

import {combineReducers} from "redux";
import {createStore} from "redux";
import {applyMiddleware} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer, {appReducerActionType} from "./app-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

export type AppActionType =
    appReducerActionType
    | AuthActionType
    | DialogPageActionsType
    | ProfilePageActionsType
    | UsersPageActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionType>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;