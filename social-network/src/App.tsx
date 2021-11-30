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
import {RootStateProps, updateNewPostText} from "./Redux/State";

export type AppPropsType = {
    state: RootStateProps,
    addPost: () => void
    updateNewPostText: (postText: string)=>void
}
const App   = (props: AppPropsType ) => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/dialogs"} render={() => <Dialogs dialogPage={props.state.dialogPage}/>}/>
                    <Route path={"/profile"} render={() => <Profile profilePage = {props.state.postPage}
                                                                    addPost={props.addPost}
                                                                    updateNewPostText={props.updateNewPostText}/>}                                                                            />
                    {/*<Route path={"/news"} component={News}/>*/}
                    {/*<Route path={"/music"} component={Music}/>*/}
                    {/*<Route path={"/settings"} component={Settings}/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
