import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../Redux/redux-store';

type mapStatePropsType = {
    isAuth: boolean,
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.data.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponents = (props: mapStatePropsType) => {

        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={"/Login"}/>
        }
        return <Component {...restProps as T} />
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponents)
    return ConnectedRedirectComponent
};
