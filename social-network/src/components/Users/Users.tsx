import React from "react";
import styles from "./Users.module.css";
import photoUser from "../../assets/images/user.png";
import {UserType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {followAPI} from "../../api/api";

type UsersPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    followingInProgress: number[],
    users: UserType[],
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
    toggleProgressFollowing: (isFetching: boolean, userId: number) => void,
};
const Users: React.FC<UsersPropsType> = (props) => {
    let pageCount = Math.ceil(props.totalCount / props.pageSize);
    let pages: number[] = [];
    for (let i: number = 1; i < pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <span>{props.totalCount}</span>
            <div>
                {pages.map((el, i) => <span key={i}
                                            className={props.currentPage === el ? styles.pageSelected : ""}
                                            onClick={() => {
                                                props.onPageChanged(el)
                                            }}>{el}</span>)}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/profile/" + u.id}>
                        <img className={styles.userPhoto}
                             src={u.photos.small !== null ? u.photos.small : photoUser}
                             alt="Аватарка пользователя"/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={(e) => {
                                    props.toggleProgressFollowing(true, u.id);
                                    followAPI.unfollowUser(u.id).then(data => {
                                        if (data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleProgressFollowing(false, u.id);
                                    })

                                }}> Follow </button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleProgressFollowing(true, u.id);
                                    followAPI.followUser(u.id).then(data => {
                                        if (data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleProgressFollowing(false, u.id);
                                    })


                                }}> UnFollow </button>
                        }
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

                </div>)
            }
        </div>
    );
};

export default Users;