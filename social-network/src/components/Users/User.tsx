import React from "react";
import styles from "./Users.module.css";
import photoUser from "../../assets/images/user.png";
import {UserType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    followingInProgress: number[],
    user: UserType,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
};
const User: React.FC<UsersPropsType> = ({user,followingInProgress,unfollow,follow,...props}) => {

    return (
        <div>
                <span>
                    <div>
                        <NavLink to={"/profile/" + user.id}>
                        <img className={styles.userPhoto}
                             src={user.photos.small !== null ? user.photos.small : photoUser}
                             alt="Аватарка пользователя"/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={(e) => {
                                    unfollow(user.id);

                                }}> UnFollow </button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id);

                                }}> Follow </button>
                        }
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

        </div>)
};

export default User;