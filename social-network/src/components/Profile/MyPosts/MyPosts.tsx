import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {addPostCallbackPropsType, PostPageType, updateNewPostText} from "../../../Redux/State";

type PropsType ={
    profile: PostPageType,
    addPostCallback: ()=>void
    updateNewPostText: (postText: string)=>void
}

export const MyPosts: React.FC <PropsType> = (props) => {

    let postsElements = props.profile.posts.map(p => <Post  key={p.id} id= {p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPost = () => {
        props.addPostCallback();
    }
    const onChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value);
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