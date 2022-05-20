import {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import {Post, PostType} from "./Post/Post";

type PostPageType = {
    posts: Array<PostType>,
    newPostText: string,
};
type PropsType = {
    profile: PostPageType,
    updateNewPostText: (text: string) => void,
    newPostText: string,
    addPost: ()=>void,
};

export const MyPosts: React.FC<PropsType> = (props) => {
    let postsElements = props.profile.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)
    const onAddPost = () => {
       props.addPost();
    };
    const onChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewPostText(text);
    };
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeNewPostText} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}