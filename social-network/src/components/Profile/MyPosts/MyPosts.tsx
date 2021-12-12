import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {AddPostActionType, PostPageType, UpdateNewPostActionType} from "../../../Redux/State";

type PropsType ={
    profile: PostPageType,
    dispatch: (action: AddPostActionType | UpdateNewPostActionType) => void
}

export const MyPosts: React.FC <PropsType> = (props) => {

    let postsElements = props.profile.posts.map(p => <Post  key={p.id} id= {p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        props.dispatch({type: "ADD-POST",postText: props.profile.newPostText});
    }
    const onChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: "UPDATE-NEW-POST-TEXT",updateText: e.currentTarget.value});
    }
    return (
        <div className={s.postsBlock}> 
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeNewPostText} value={props.profile.newPostText}/>
                </div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}