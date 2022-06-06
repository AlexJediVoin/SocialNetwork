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
                users: {
                    items: state.users.items.map(u => {
                        if (u.id === action.userID) {
                            return {...u, followed: true};
                        }
                        return u;
                    })
                }
            }

        case UNFOLLOW:
            return {
                ...state,
                users: {
                    items: state.users.items.map(u => {
                        if (u.id === action.userID) {
                            return {...u, followed: false};
                        }
                        return u;
                    })
                }
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

export const follow = (userID: number): FollowACType => {
    return ({
        type: FOLLOW,
        userID: userID,
    });
}
export const unfollow = (userID: number): UnFollowACType => {
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
export default usersReducer;