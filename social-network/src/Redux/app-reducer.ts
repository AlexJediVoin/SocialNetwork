import {FormAction} from "redux-form";
import {getAuthUserData} from "./auth-reducer";
import {AppThunk} from "./redux-store";

const INITIALUZED_SUCCESS = "social-network/app/INITIALUZED_SUCCESS";

export type initialuzedSuccessACType = {
    type: "social-network/app/INITIALUZED_SUCCESS"
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
        case INITIALUZED_SUCCESS:
            return {
                ...state,
                initialuzed: true
            }
        default:
            return state;
    }
}

export const initialuzedSuccess = (): initialuzedSuccessACType => {
    return {
        type: INITIALUZED_SUCCESS,
    }
}

export const initializeApp = (): AppThunk =>
    dispatch => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise]).then(() => {
            dispatch(initialuzedSuccess());
        })
    }

export default appReducer;