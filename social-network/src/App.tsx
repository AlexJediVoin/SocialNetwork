import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {ActionsTypes, RootStateProps, StoreType} from "./Redux/Store";

export type AppPropsType = {
    store: StoreType
}
const App: React.FC<AppPropsType> = ({store}) => {

    const {_state:state,dispatch} = store;
    // let store = props.store;
    // const dispatch = props.store.dispatch;
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/dialogs"} render={() => <Dialogs dialogPage={state.dialogPage}
                                                                    dispatch={dispatch}/>}/>
                    <Route path={"/profile"} render={() => <Profile store = {store}
                    />}/>
                    {/*<Route path={"/news"} component={News}/>*/}
                    {/*<Route path={"/music"} component={Music}/>*/}
                    {/*<Route path={"/settings"} component={Settings}/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
