const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

export type UserType = {
    id: number
    photoUrl: string
    name: string
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}
export type UsersPageType = {
    users: {
        items: Array<UserType>
    }
    totalCount: number
    error: null
}
export type FollowACType = {
    type: 'FOLLOW'
    userID: number
}
export type UnFollowACType = {
    type: 'UNFOLLOW'
    userID: number
}
export type SetUsersACType = {
    type: 'SET_USERS'
    users: Array<UserType>
}
export type UsersPageActionType = FollowACType | UnFollowACType | SetUsersACType;

let initialState: UsersPageType = {
    users:
        {
            items: []
        },
    totalCount: 0,
    error: null
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
            return {...state, users: {items: [...state.users.items, ...action.users]}}
        }
        default:
            return state;
    }
}
export const followAC = (userID: number): FollowACType => {
    return {
        type: FOLLOW,
        userID: userID
    }
}
export const unfollowAC = (userID: number): UnFollowACType => {
    return {
        type: UNFOLLOW,
        userID: userID
    }
}
export const setUsersAC = (users: Array<UserType>): SetUsersACType => {
    return {
        type: SET_USERS,
        users: users
    }
}
export default usersReducer;