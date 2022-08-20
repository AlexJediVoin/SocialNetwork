import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {authApi, loginResponseType, ResultCodesEnum} from "../api/api";
import { getAuthUserData } from "./auth-reducer";
import {AppActionType, AppStateType, AppThunk} from "./redux-store";

const INITIALUZED_SUCCESS = "INITIALUZED_SUCCESS";

export type initialuzedSuccessACType = {
    type: "INITIALUZED_SUCCESS"
}

export type appReducerActionType = FormAction | initialuzedSuccessACType;

type stateType = {
    initialuzed: boolean
}

let initialState = {
    initialuzed: false
}

const appReducer = (state = initialState, action: appReducerActionType): stateType => {
    switch (action.type) {
        case "INITIALUZED_SUCCESS":
            return {
                ...state,
                initialuzed: true
            }
        default: return state;
    }
}

export const initialuzedSuccess = (): initialuzedSuccessACType => {
    return {
        type: INITIALUZED_SUCCESS,
    }
}

/*export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean) => {
    return ({
        type: SET_USER_DATA,
        payload: {userId,email,login,isAuth}
    })
}*/

export const initializeApp = ():AppThunk =>
    dispatch => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise]).then(()=>{
            dispatch(initialuzedSuccess());
        })
    }


/*export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return (dispatch) => {
        return authApi.me().then(response => {
            if (response.resultCode === ResultCodesEnum.Sucsess) {
                let {id, email, login} = response.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
    }
}*/

/*
export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return (dispatch) => {
        return authApi.login(email, password, rememberMe).then(response => {
            if (response.resultCode === ResultCodesEnum.Sucsess) {
                dispatch(getAuthUserData());
            } else {
                let message = response.messages.length > 0 ? response.messages[0] : "Some error!";
                dispatch(stopSubmit("login", {_error: message}));
            }
        })
    }
}

export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return (dispatch) => {
        return authApi.logout().then(response => {
            if (response.resultCode === ResultCodesEnum.Sucsess) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
    }
}
*/

export default appReducer;