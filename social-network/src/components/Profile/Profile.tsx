import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AddPostActionType, PostPageType, UpdateNewPostActionType} from "../../Redux/State";

type PostPagePropsType = {
    profilePage: PostPageType
    dispatch: (action: AddPostActionType | UpdateNewPostActionType) => void
}

export const Profile: React.FC<PostPagePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts profile={props.profilePage}
                     dispatch={props.dispatch}
            />
        </div>
    )
}