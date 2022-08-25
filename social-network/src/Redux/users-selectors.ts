import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";
import { UserType } from "./users-reducer";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users.items;
}

export const getUsers = createSelector(getUsersSelector,(users: UserType[])=>{
    return users.filter(u=>true)
});



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


