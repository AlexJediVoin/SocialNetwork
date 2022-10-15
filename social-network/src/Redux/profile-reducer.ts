import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../api/api";
import {AppStateType} from "./redux-store";

const ADD_POST = "social-network/profile/ADD-POST";
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE";
const SET_STATUS = "social-network/profile/SET_STATUS";
const DELETE_POST = "social-network/profile/DELETE-POST";

export type UserProfileType = null | {
    userId: number,
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string | null,
        vk: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        website: string | null,
        youtube: string | null,
        mainLink: string | null,
    },
    photos: {
        small: string | null,
        large: string | null,
    }
};

export type PostType = {
    id: string
    message: string
    likesCount: number
};

export type ProfilePageType = {
    posts: Array<PostType>,
    status: string,
    profile: UserProfileType,
};
export type AddPostCreatorType = {
    type: "social-network/profile/ADD-POST",
    postText: string,
};

export type DeletePostACType = {
    type: "social-network/profile/DELETE-POST",
    payload: {
        postId: string
    }
};

export type SetStatusProfileType = {
    type: "social-network/profile/SET_STATUS",
    payload: {
        status: string
    }
};

export type SetUserProfileType = {
    type: "social-network/profile/SET_USER_PROFILE",
    payload: {
        profile: UserProfileType
    },
};
export type ProfilePageActionsType =
    AddPostCreatorType
    | SetUserProfileType
    | SetStatusProfileType
    | DeletePostACType;

let initialState: ProfilePageType = {
    posts: [
        {id: "1", message: "Hi, how are you?", likesCount: 2},
        {id: "2", message: "It's my first post.", likesCount: 5},
        {id: "3", message: "Hi, how are you?", likesCount: 2},
        {id: "4", message: "It's my first post.", likesCount: 5}],
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action: ProfilePageActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                id: "5",
                message: action.postText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case SET_USER_PROFILE: {
            return {...state, posts: [...state.posts], profile: action.payload.profile};
        }
            ;
        case SET_STATUS: {
            return {...state, status: action.payload.status};
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload.postId)
            }
        }
        default:
            return state;
    }
}

export const addPostCreator = (postText: string): AddPostCreatorType => {
    return {
        type: ADD_POST,
        postText: postText,
    } as const;
}

export const deletePostCreator = (postId: string): DeletePostACType => {
    return {
        type: DELETE_POST,
        payload: {postId},
    } as const;
}
export const setStatusCreator = (status: string): SetStatusProfileType => {
    return {
        type: SET_STATUS,
        payload: {status}
    } as const;
}

export const setUserProfile = (profile: UserProfileType): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        payload: {profile},
    } as const;
}

export const getUserProfile = (userID: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userID);
        dispatch(setUserProfile(response));
    }
}

export const getStatusProfile = (userID: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userID);
        dispatch(setStatusCreator(response));
    }
}

export const updateStatusProfile = (status: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatusCreator(status));
        }
    }
}

export default profileReducer;