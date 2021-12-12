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
import {AddPostActionType, RootStateProps, StoreType, UpdateNewPostActionType} from "./Redux/State";

export type AppPropsType = {
    state: RootStateProps,
    dispatch: (action: AddPostActionType | UpdateNewPostActionType) => void
}
const App: React.FC<AppPropsType> = (props) => {

    const state = props.state;
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/dialogs"} render={() => <Dialogs dialogPage={state.dialogPage}/>}/>
                    <Route path={"/profile"} render={() => <Profile profilePage={state.postPage}
                                                                    dispatch={props.dispatch}
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
