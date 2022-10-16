import profileReducer, {ProfilePageActionsType} from "./profile-reducer";
import dialogsReducer, {DialogPageActionsType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersPageActionType} from "./users-reducer";
import { createStore, applyMiddleware} from 'redux';
import {combineReducers} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer, {appReducerActionType} from "./app-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

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

/*const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));*/
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
));
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;