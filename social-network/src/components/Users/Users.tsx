import React from "react";
import {UserType} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator"
import User from "./User";

type UsersPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    followingInProgress: number[],
    users: UserType[],
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
};
const Users: React.FC<UsersPropsType> = ({currentPage, pageSize, totalCount, onPageChanged, users, ...props}) => {
    return (
        <div>
            {/*<span>{totalCount}</span>*/}
            <Paginator currentPage={currentPage}
                       pageSize={pageSize}
                       totalCount={totalCount}
                       onPageChanged={onPageChanged}
            />

            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     followingInProgress={props.followingInProgress}
                                     follow={props.follow}
                                     unfollow={props.unfollow}/>
                )
            }
        </div>
    )
};

export default Users;