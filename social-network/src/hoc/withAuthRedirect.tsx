import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {initializeApp} from '../Redux/app-reducer';
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

    const RedirectComponents = (props: mapStatePropsType & {
        initializeApp: () => void,
    }) => {

        let {isAuth, initializeApp, ...restProps} = props
        if (!isAuth) {
            initializeApp();
            return null
        }
        if (!isAuth) {
            return <Redirect to={"/Login"}/>
        }
        return <Component {...restProps as T} />
    }
    let ConnectedRedirectComponent = connect(mapStateToProps, {initializeApp})(RedirectComponents)
    return ConnectedRedirectComponent
};
