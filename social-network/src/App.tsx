import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import * as React from 'react';
/*import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";*/
import DialogsContainer from "./components/Dialogs/DialogsContainer";
/*import Users from './components/Users/Users';*/
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from './components/Login/Login';


const App = () => {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                        <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>

                        <Route path={"/users"} render={() => <UsersContainer/>}/>
                        <Route path={"/login"} render={() => <LoginPage/>}/>
                    </Switch>
                    {/*<Route path={"/news"} component={News}/>*/}
                    {/*<Route path={"/music"} component={Music}/>*/}
                    {/*<Route path={"/settings"} component={Settings}/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
