import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null,
};
type MapDispatchToPropsType = {
    setAuthUserData: (id: number | null,
                      email: string | null,
                      login: string | null) => void,
};

class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                debugger;
                this.props.setAuthUserData(id, email, login);
            }
        })
    }

    render() {
        return <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

let MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {setAuthUserData})(HeaderContainer);