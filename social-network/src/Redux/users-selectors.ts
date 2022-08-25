import { AppStateType } from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users.items;
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.count;
}

export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.page;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}


