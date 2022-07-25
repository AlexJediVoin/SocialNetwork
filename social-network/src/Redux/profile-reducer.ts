import {ThunkAction} from "redux-thunk";
import {profileAPI} from "../api/api";
import {PostType} from "../components/Profile/MyPosts/Post/Post";
import {AppStateType} from "./redux-store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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

export type ProfilePageType = {
    posts: Array<PostType>,
    newPostText: string,
    status: string,
    profile: UserProfileType,
};
export type AddPostCreatorType = {
    type: "ADD-POST",
    postText: string,
};

export type SetStatusProfileType = {
    type: "SET_STATUS",
    payload: {
        status: string
    }
};
export type UpdateNewPostCreatorType = {
    type: "UPDATE-NEW-POST-TEXT",
    updateText: string,
};
export type SetUserProfileType = {
    type: "SET_USER_PROFILE",
    payload: {
        profile: UserProfileType
    },
};
export type ProfilePageActionsType =
    AddPostCreatorType
    | UpdateNewPostCreatorType
    | SetUserProfileType
    | SetStatusProfileType;

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 2},
        {id: 2, message: "It's my first post.", likesCount: 5},
        {id: 3, message: "Hi, how are you?", likesCount: 2},
        {id: 4, message: "It's my first post.", likesCount: 5}],
    newPostText: '',
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action: ProfilePageActionsType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostType = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.updateText
            };
        case SET_USER_PROFILE: {
            return {...state, posts: [...state.posts], profile: action.payload.profile};
        }
            ;
        case SET_STATUS: {
            return {...state, status: action.payload.status};
        }
        default:
            return state;
    }
}

export const addPostCreator = (postText: string): AddPostCreatorType => {
    return {
        type: ADD_POST,
        postText: postText,
    }as const;
}
export const setStatusCreator = (status: string): SetStatusProfileType => {
    return {
        type: "SET_STATUS",
        payload: {status}
    } as const;
}

export const updateNewPostCreator = (text: string): UpdateNewPostCreatorType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        updateText: text,
    }as const;
}
const setUserProfile = (profile: UserProfileType): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        payload: {profile},
    }as const;
}
export const getUserProfile = (userID: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return (dispatch) => {
        return profileAPI.getProfile(userID).then(data => {
            dispatch(setUserProfile(data));
        })
    }
}
export const getStatusProfile = (userID: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return (dispatch) => {
        return profileAPI.getStatus(userID).then(data => {
            dispatch(setStatusCreator(data));
        })
    }
}
export const updateStatusProfile = (status: string): ThunkAction<Promise<void>, AppStateType, unknown, ProfilePageActionsType> => {
    return (dispatch) => {
        return profileAPI.updateStatus(status).then(response => {
            if (response.resultCode === 0) {
                dispatch(setStatusCreator(status));
            }
        })
    }
}


export default profileReducer;