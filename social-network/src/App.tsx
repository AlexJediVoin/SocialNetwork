import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {
    Switch,
    Route,
    withRouter,
    BrowserRouter,
} from "react-router-dom";
import * as React from 'react';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from 'react-redux';
import store, { AppStateType } from './Redux/redux-store';
import { initializeApp } from './Redux/app-reducer';
import { compose } from 'redux';
import {ComponentType} from "react";
import Preloader from './components/common/Prealoder/Preloader';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));


type MapDispatchToPropsType = {
    initializeApp: () => void,
};

type MapStateToPropsType ={
    initialized: boolean;
}

class App extends React.Component<MapDispatchToPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {

        if (!this.props.initializeApp) {
            return <Preloader/>
        }
        return (

                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route path={"/dialogs"} render={withSuspense(DialogsContainer) }/>
                            <Route path={"/profile/:userId?"} render={withSuspense(ProfileContainer)}/>

                            <Route path={"/users"} render={() => <UsersContainer/>}/>
                            <Route path={"/login"} render={withSuspense(LoginPage)}/>
                        </Switch>
                    </div>
                </div>
        );
    }
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType =>{
    return {
        initialized: state.app.initialuzed
    }
}
let AppContainer = compose<ComponentType> (
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(MapStateToProps, {initializeApp}))(App);

const SamuraiJsApp = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default SamuraiJsApp;