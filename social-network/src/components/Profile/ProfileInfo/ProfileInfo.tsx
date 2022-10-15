import React from "react";
import {UserProfileType} from "../../../Redux/profile-reducer";
import Preloader from "../../common/Prealoder/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: UserProfileType,
    status: string,
    updateStatus: (userID: string) => void,
}

export const ProfileInfo: React.FC <ProfileInfoPropsType> = ({profile,status,updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6r0BJokCLDfJfqE8rlDmhQzHI-81mL6h07Q&usqp=CAU"
                    alt="img-content"/>
            </div>
                < img src={profile.photos.large !== null ? profile.photos.large : ""} alt="Фотография пользователя увеличенная"/>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          {/*  <div className={s.descriptionBlock}> ava + description</div>*/}
        </div>
    )
}