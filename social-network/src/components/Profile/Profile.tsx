import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {addPostCallbackPropsType, PostPageType} from "../../Redux/State";

type PostPagePropsType = {
    profilePage: PostPageType
    addPost: () => void
    updateNewPostText: (postText: string)=>void
}

export const Profile: React.FC <PostPagePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts  profile={props.profilePage}
                      addPostCallback={props.addPost}
                      updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
}