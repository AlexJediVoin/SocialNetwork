import React from "react";
import s from "./ProfileInfo.module.css";
import {UserProfileType} from "../../../Redux/profile-reducer";
import Preloader from "../../common/Prealoder/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";


type ProfileInfoPropsType = {
    profile: UserProfileType,
    status: string,
    updateStatus: (userID: string) => void,
}

export const ProfileInfo: React.FC <ProfileInfoPropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6r0BJokCLDfJfqE8rlDmhQzHI-81mL6h07Q&usqp=CAU"
                    alt="img-content"/>
            </div>
                < img src={props.profile.photos.large !== null ? props.profile.photos.large : ""} alt="Фотография пользователя увеличенная"/>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
          {/*  <div className={s.descriptionBlock}> ava + description</div>*/}
        </div>
    )
}