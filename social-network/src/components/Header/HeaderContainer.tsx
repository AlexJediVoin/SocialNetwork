import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import { logout } from "../../Redux/auth-reducer";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null,
};
type MapDispatchToPropsType = {
    logout: ()=>void
};

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    render() {
        return <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
    }
}

let MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.data.isAuth,
    login: state.auth.data.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {logout})(HeaderContainer);