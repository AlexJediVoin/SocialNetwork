import {ActionsTypes, AddPostCreatorType, PostPageType, PostType, UpdateNewPostCreatorType} from "./Store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type ProfilePageActionsType = AddPostCreatorType | UpdateNewPostCreatorType

let initialState: PostPageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 2},
        {id: 2, message: "It's my first post.", likesCount: 5},
        {id: 3, message: "Hi, how are you?", likesCount: 2},
        {id: 4, message: "It's my first post.", likesCount: 5}],
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): PostPageType => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostType = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.updateText;
            return state;
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