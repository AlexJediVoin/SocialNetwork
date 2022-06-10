import {ThunkAction} from "redux-thunk";
import {authApi, ResultCodesEnum} from "../api/api";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA";

export type AuthUserType = {
    resultCode: number,
    messages: string[],
    data: {
        id: number | null,
        email: string | null,
        login: string | null,
    },
    isFetching: boolean,
    isAuth: boolean,
};

export type SetUserDataACType = {
    type: "SET_USER_DATA",
    payload: {
        id: number | null,
        email: string | null,
        login: string | null,
    },
};

export type AuthActionType = SetUserDataACType

let initialState: AuthUserType = {
    resultCode: 0,
    messages: ["Пользователь не авторизован"],
    data: {
        id: 0,
        email: "",
        login: "Не авторизованный пользователь",
    },
    isFetching: true,
    isAuth: false,
};

const authReducer = (state = initialState, action: AuthActionType): AuthUserType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {...state, data: {...action.payload}, isAuth: true}
        default:
            return state;
    }
}

export const setAuthUserData = (id: number | null,
                                email: string | null,
                                login: string | null): SetUserDataACType => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login},
    }
}

export const getAuthUserData = (): ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType> => {
    return (dispatch) => {
        return authApi.me().then(response => {
            if (response.resultCode === ResultCodesEnum.Sucsess) {
                let {id, email, login} = response.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
    }
}

export default authReducer;