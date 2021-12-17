import React, {ChangeEvent} from "react";
import {
    StoreType,
} from "../../../Redux/Store";
import {addPostCreator,updateNewPostCreator} from "../../../Redux/profile-reducer"
import {MyPosts} from "./MyPosts";

type PropsType = {
   store: StoreType
}

export const MyPostsContainer: React.FC<PropsType> = (props) => {
    let state = props.store.getState();

    const addPost = () => {
        let postText = state.profilePage.newPostText;
        let action = addPostCreator(postText);
        props.store.dispatch(action);
    }
    const onPostChange = (text: string) => {
        let action = updateNewPostCreator(text);
        props.store.dispatch(action);
    }
    return (
        <MyPosts updateNewPostText = {onPostChange}
                 addPost={addPost}
                 profile={state.profilePage}
                 newPostText={state.profilePage.newPostText}
        />
    )
}