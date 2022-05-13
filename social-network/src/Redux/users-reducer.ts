import {ActionsTypes} from "./Store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

/*type LocationType = {
    city: string,
    country: string
}*/
export type UserType = {
    id: number
    photoUrl: string
    name: string
    photos: {
        small: null |string
        large: null | string
    },
    status: null | string
    followed: boolean
}
export type UsersPageType = {
    users:{
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
export type UsersPageActionCreator = FollowACType | UnFollowACType | SetUsersACType;

let initialState: UsersPageType = {
    users:
        {
        items: []
        },
    totalCount: 0,
    error: null
};
/* users: [
     {
         id: 1,
         followed: false,
         photoUrl: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg',
         fullname: "Alexandr",
         status: "React developer",
         location: {city: "Orenburg", country: "Russia"}
     },
     {
         id: 2,
         followed: true,
         photoUrl: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg',
         fullname: "Dimych",
         status: "I am boss",
         location: {city: "Minsk", country: "Belarus"}
     },
     {
         id: 3,
         followed: true,
         photoUrl: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg',
         fullname: "Maria",
         status: "I am a teacher",
         location: {city: "Moskow", country: "Russia"}
     },
     {
         id: 4,
         followed: false,
         photoUrl: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg',
         fullname: "Anna",
         status: "I am a musicant",
         location: {city: "Ekaterinburg", country: "Russia"}
     }
 ]*/

const usersReducer = (state = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
            users:{
                    items: state.users.items.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true};
                    }
                    return u;
                })}
            }

        case UNFOLLOW:
            return {
                ...state,
                users:{
                    items: state.users.items.map(u => {
                        if (u.id === action.userID) {
                            return {...u, followed: false};
                        }
                        return u;
                    })
                }
            };
        case SET_USERS: {
            return {...state, users:{items: [...state.users.items,...action.users]}}
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