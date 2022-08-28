import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {PostType} from "../../../Redux/profile-reducer";
import {maxLenghtCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControl";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";

type PostPageType = {
    posts: Array<PostType>,
};

type PropsType = {
    profile: PostPageType,
    addPost: (newText: string) => void,
};

export type FormDataType = {
    newPostText: string
}

const maxLenght10 = maxLenghtCreator(10);

export const MyPosts = React.memo((props:PropsType) => {
    console.log("RENDER MYPOST");
    let postsElements = props.profile.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                           likesCount={p.likesCount}/>)
    const onAddPost = (values: FormDataType) => {
        debugger
        console.log(values.newPostText)
        props.addPost(values.newPostText);
    };
    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <div>
                <MyPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const MyPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={"newPostText"} placeholder={"Post message..."}
                   validate={[required, maxLenght10]}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const MyPostReduxForm = reduxForm<FormDataType>({
    form: "ProfileAddNewPostForm"
})(MyPostForm)