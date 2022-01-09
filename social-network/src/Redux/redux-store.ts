import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
})
let store = createStore(reducers);

export default store;