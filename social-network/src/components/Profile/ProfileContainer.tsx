import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, UserProfileType} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Redirect, withRouter} from "react-router";
import {RouteComponentProps} from "react-router/ts4.0";
import {profileAPI} from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapStatePropsType = {
    profile: UserProfileType,
};
type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void,
}
type PathParamsType = {
    userId: string,
}
type CommonPropsType = RouteComponentProps<PathParamsType> & MapStatePropsType & MapDispatchPropsType;

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)
(ProfileContainer);