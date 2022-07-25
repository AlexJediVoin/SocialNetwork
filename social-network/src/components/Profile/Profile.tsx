import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import {UserProfileType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    profile: UserProfileType,
    status: string,
    updateStatus: (newStatus: string) => void,
}
export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
