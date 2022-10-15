import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {authApi, ResultCodesEnum} from "../api/api";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA";

export type AuthUserType = {
    resultCode: number,
    messages: string[],
    data: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
    },
    isFetching: boolean,
};

export type setUserDataACType = {
    type: "social-network/auth/SET_USER_DATA",
    payload: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean,
    },
};

export type AuthActionType = setUserDataACType | FormAction;

let initialState: AuthUserType = {
    resultCode: 0,
    messages: ["Пользователь не авторизован"],
    data: {
        userId: 0,
        email: "",
        login: "Не авторизованный пользователь",
        isAuth: false,
    },
    isFetching: true,
};


const authReducer = (state = initialState, action: AuthActionType): AuthUserType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                data: {...action.payload}
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    })
}

export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return async (dispatch) => {
        let response = await authApi.me();

        if (response.resultCode === ResultCodesEnum.Sucsess) {
            let {id: userId, email, login} = response.data;
            dispatch(setAuthUserData(userId, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe);

        if (response.resultCode === ResultCodesEnum.Sucsess) {
            dispatch(getAuthUserData());
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : "Some error!";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return async (dispatch) => {
        let response = await authApi.logout();
        if (response.resultCode === ResultCodesEnum.Sucsess) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;