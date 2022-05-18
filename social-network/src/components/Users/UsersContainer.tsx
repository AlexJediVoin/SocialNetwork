import {Dispatch} from "react";

import * as React from 'react';
import { AppStateType } from "../../Redux/redux-store";
import {ActionsTypes} from "../../Redux/Store";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../Redux/users-reducer";
import Users from "./Users";
import { connect } from "react-redux";

export type MapStateToPropsType = {
    users: UserType[]
}

export type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users.items
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): MapDispatchPropsType => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID));
        },
        unfollow: (userID: number) => {
            dispatch(unfollowAC(userID));
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users));
        }
    }
}


const UsersContainer = connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;
