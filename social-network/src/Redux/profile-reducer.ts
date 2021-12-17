import {ActionsTypes, AddPostCreatorType, PostPageType, PostType, UpdateNewPostCreatorType} from "./State";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type ProfilePageActionsType = AddPostCreatorType | UpdateNewPostCreatorType

const profileReducer = (state: PostPageType, action: ActionsTypes) => {
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