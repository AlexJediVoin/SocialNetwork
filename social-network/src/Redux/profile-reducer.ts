import {PostType} from "../components/Profile/MyPosts/Post/Post";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

type PostPageType = {
    posts: Array<PostType>
    newPostText: string
}
export type AddPostCreatorType = {
    type: "ADD-POST",
    postText: string
}
export type UpdateNewPostCreatorType = {
    type: "UPDATE-NEW-POST-TEXT",
    updateText: string
}

export type ProfilePageActionsType = AddPostCreatorType | UpdateNewPostCreatorType

let initialState: PostPageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 2},
        {id: 2, message: "It's my first post.", likesCount: 5},
        {id: 3, message: "Hi, how are you?", likesCount: 2},
        {id: 4, message: "It's my first post.", likesCount: 5}],
    newPostText: ''
}

const profileReducer = (state = initialState, action: ProfilePageActionsType): PostPageType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: PostType = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.updateText
            }
        }
        default:
            return state;
    }
}

export const addPostCreator = (postText: string): AddPostCreatorType => {
    return {
        type: ADD_POST,
        postText: postText
    }
}

export const updateNewPostCreator = (text: string): UpdateNewPostCreatorType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        updateText: text
    }
}
export default profileReducer;