import {PostType} from "../components/Profile/MyPosts/Post/Post";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

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
    profile: UserProfileType
};
export type AddPostCreatorType = {
    type: "ADD-POST",
    postText: string,
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
export type ProfilePageActionsType = AddPostCreatorType | UpdateNewPostCreatorType | SetUserProfileType;

let initialState: ProfilePageType= {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 2},
        {id: 2, message: "It's my first post.", likesCount: 5},
        {id: 3, message: "Hi, how are you?", likesCount: 2},
        {id: 4, message: "It's my first post.", likesCount: 5}],
    newPostText: '',
    profile: null,
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
            return {...state,posts: [...state.posts],profile: action.payload.profile};
        }
        default:
            return state;
    }
}

export const addPostCreator = (postText: string): AddPostCreatorType => {
    return {
        type: ADD_POST,
        postText: postText,
    };
}
export const updateNewPostCreator = (text: string): UpdateNewPostCreatorType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        updateText: text,
    };
}
export const SetUserProfile = (profile: UserProfileType): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        payload:{profile},
    };
}
export default profileReducer;