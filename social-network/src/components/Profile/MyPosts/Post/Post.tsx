import React from "react";
import { PostType } from "../../../../Redux/profile-reducer";
import s from "./Post.module.css";

export const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://download-cs.net/steam/avatars/3446.jpg" alt="avatar"/>
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}