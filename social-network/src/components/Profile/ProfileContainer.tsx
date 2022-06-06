import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {SetUserProfile, UserProfileType} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {withRouter} from "react-router";
import {RouteComponentProps} from "react-router/ts4.0";
import {profileAPI} from "../../api/api";

type MapStatePropsType = {
    profile: UserProfileType,
};
type MapDispatchPropsType = {
    SetUserProfile: (profile: UserProfileType) => void,
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
        profileAPI.setUserProfile(userId).then(data => {
            this.props.SetUserProfile(data);
        })
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
let WithUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {SetUserProfile})(WithUrlDataContainerComponent);