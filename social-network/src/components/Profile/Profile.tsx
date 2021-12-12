import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, PostPageType} from "../../Redux/State";

type PostPagePropsType = {
    profilePage: PostPageType
    dispatch: (action: ActionsTypes) => void
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