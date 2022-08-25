import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getStatusProfile, getUserProfile, updateStatusProfile, UserProfileType} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Redirect, withRouter} from "react-router";
import {RouteComponentProps} from "react-router/ts4.0";
import {profileAPI} from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapStatePropsType = {
    profile: UserProfileType,
    status: string,
    authorizedUserId: number | null,
    isLogin: boolean,
};
type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void,
    getStatusProfile: (userID: string) => void,
    updateStatusProfile: (newStatus: string) => void,
}
type PathParamsType = {
    userId: string,
}
type CommonPropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType;

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        console.log('props', this.props)

        if (!userId && this.props.authorizedUserId && this.props.isLogin) {
            userId = `${this.props.authorizedUserId}`;
        }
        this.props.getUserProfile(userId);
        this.props.getStatusProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.userId,
    isLogin: state.auth.data.isAuth,
})


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile,getStatusProfile, updateStatusProfile}),
    withRouter,
    withAuthRedirect
)
(ProfileContainer);