import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {
    ActionsTypes,
    PostPageType,
} from "../../../Redux/Store";
import {addPostCreator,updateNewPostCreator} from "../../../Redux/profile-reducer"

type PropsType = {
    profile: PostPageType,
    dispatch: (action: ActionsTypes) => void
}

export const MyPosts: React.FC<PropsType> = (props) => {

    let postsElements = props.profile.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                           likesCount={p.likesCount}/>)
    const addPost = () => {
        let postText = props.profile.newPostText;
        let action = addPostCreator(postText);
        props.dispatch(action);
    }
    const onChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        let action = updateNewPostCreator(text);
        props.dispatch(action);
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeNewPostText} value={props.profile.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}