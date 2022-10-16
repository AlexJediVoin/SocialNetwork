import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./Redux/redux-store";
import {BrowserRouter} from 'react-router-dom';
import SamuraiJsApp from './App';


ReactDOM.render(
    <SamuraiJsApp/>,
document.getElementById('root')
);

