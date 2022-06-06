import React from "react";
import styles from "./Users.module.css";
import photoUser from "../../assets/images/user.png";
import {UserType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    users: UserType[],
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
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
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "96a18d4f-33c1-4ced-87aa-45d672260070"
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                    })

                                }}> Follow </button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "96a18d4f-33c1-4ced-87aa-45d672260070"
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
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