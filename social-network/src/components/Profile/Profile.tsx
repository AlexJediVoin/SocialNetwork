import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, PostPageType, StoreType} from "../../Redux/Store";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";

type PostPagePropsType = {
    store: StoreType
}

export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}