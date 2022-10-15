import * as React from "react";
import {AppStateType} from "../../Redux/redux-store";
import {
    follow,
    UserType,
    unfollow,
    requestUsers,
} from "../../Redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Prealoder/Preloader";
import { compose } from "redux";
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalCount, getUsers } from "../../Redux/users-selectors";


export type MapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
};

export type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (usersID: number) => void
    unfollow: (usersID: number) => void
};

type PropsType = MapStateToPropsType & MapDispatchPropsType;

class UsersContainerComponent extends React.Component<PropsType, MapStateToPropsType> {
    componentDidMount() {
        const {currentPage,pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}


            <Users totalCount={this.props.totalCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}

                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
        {
            requestUsers,
            follow,
            unfollow,
        })
)
(UsersContainerComponent);
