import {Dispatch} from "react";
import {connect} from "react-redux";
import { AppStateType } from "../../Redux/redux-store";
import {ActionsTypes} from "../../Redux/Store";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../Redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users.items
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {
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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
