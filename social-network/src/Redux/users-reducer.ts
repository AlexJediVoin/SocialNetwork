import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {followAPI, followAPIUserType, ResultCodesEnum, usersAPI} from "../api/api";
import { updateObjInArray } from "../utils/object-helpers";
import {AppStateType} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS";

export type UserType = {
    id: number,
    photoUrl: string,
    name: string,
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean,
};
export type UsersPageType = {
    users: {
        items: Array<UserType>,
    },
    totalCount: number,
    count: number,
    page: number,
    isFetching: boolean,
    error: null,
    followingInProgress: number[],
};
export type FollowACType = {
    type: "FOLLOW",
    userID: number,
};
export type SetCurrentPageACType = {
    type: "SET_CURRENT_PAGE",
    page: number,
};
export type UnFollowACType = {
    type: "UNFOLLOW",
    userID: number,
};
export type SetUsersACType = {
    type: "SET_USERS",
    users: Array<UserType>,
};
export type setTotalUsersCountACType = {
    type: "SET_USERS_TOTAL_COUNT",
    totalUsersCount: number,
};
export type toggleIsFetchingACType = {
    type: "TOGGLE_IS_FETCHING",
    payload: {
        isFetching: boolean,
    },
};
export type followingInProgressACType = {
    type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
    payload: {
        userId: number,
        isFetching: boolean
    },
};
export type UsersPageActionType =
    FollowACType
    | UnFollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | setTotalUsersCountACType
    | toggleIsFetchingACType
    | followingInProgressACType;

let initialState: UsersPageType = {
    users:
        {
            items: []
        },
    totalCount: 30,
    count: 5,
    page: 2,
    isFetching: true,
    followingInProgress: [],
    error: null,
};

const usersReducer = (state = initialState, action: UsersPageActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users,action.userID,"id",{followed: true} )
            }

        case UNFOLLOW:
            return {
                ...state,
                users:updateObjInArray(state.users,action.userID,"id",{followed: false} )
            };
        case SET_USERS: {
            return {...state, users: {items: [...action.users]}};
        }
        case SET_CURRENT_PAGE:
            return {...state, page: action.page};
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalCount: action.totalUsersCount};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.payload.isFetching};
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state, followingInProgress:
                    action.payload.isFetching
                        ? [...state.followingInProgress, action.payload.userId]
                        : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userID: number): FollowACType => {
    return ({
        type: FOLLOW,
        userID: userID,
    });
}
export const unfollowSuccess = (userID: number): UnFollowACType => {
    return ({
        type: UNFOLLOW,
        userID: userID,
    });
}
export const setUsers = (users: Array<UserType>): SetUsersACType => {
    return ({
        type: SET_USERS,
        users: users,
    });
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => {
    return ({
        type: SET_CURRENT_PAGE,
        page: currentPage,
    });
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountACType => {
    return ({
        type: SET_USERS_TOTAL_COUNT,
        totalUsersCount,
    });
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => {
    return ({
        type: TOGGLE_IS_FETCHING,
        payload: {isFetching},
    });
}
export const toggleProgressFollowing = (isFetching: boolean, userId: number): followingInProgressACType => {
    return ({
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        payload: {isFetching, userId},
    });
}

export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionType> => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch:Dispatch,
                                  usersID: number,
                                  apiMethod:(usersID: number) => Promise<followAPIUserType>,
                                  actionCreator: (usersID: number) => FollowACType | UnFollowACType) => {

    dispatch(toggleProgressFollowing(true, usersID));
    let data = await apiMethod(usersID);

    if (data.resultCode === ResultCodesEnum.Sucsess) {
        dispatch(actionCreator(usersID));
    }
    dispatch(toggleProgressFollowing(false, usersID));
}

export const follow = (usersID: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionType> => {
    return async (dispatch) => {
        let apiMethod = followAPI.followUser.bind(followAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow(dispatch, usersID, apiMethod,actionCreator)
    }
}

export const unfollow = (usersID: number): ThunkAction<Promise<void>, AppStateType, unknown, UsersPageActionType> => {
    return async (dispatch) => {
        let apiMethod = followAPI.unfollowUser.bind(followAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, usersID, apiMethod,actionCreator)
    }
}

export default usersReducer;