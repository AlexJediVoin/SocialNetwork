import React from "react";
import {
    StoreType,
} from "../../../Redux/Store";
import {addPostCreator,updateNewPostCreator} from "../../../Redux/profile-reducer"
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";


type PropsType = {
   store: StoreType
}

export const MyPostsContainer= () => {

    return (
        <StoreContext.Consumer>
            {
            (store)=> {
                let state = store.getState();
                const addPost = () => {
                    let postText = state.profilePage.newPostText;
                    let action = addPostCreator(postText);
                    store.dispatch(action);
                }
                const onPostChange = (text: string) => {
                    let action = updateNewPostCreator(text);
                    store.dispatch(action);
                }
                return <MyPosts updateNewPostText={onPostChange}
                         addPost={addPost}
                         profile={state.profilePage}
                         newPostText={state.profilePage.newPostText}
                />
            }
        }
        </StoreContext.Consumer>
    )
}