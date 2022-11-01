//import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./Redux/redux-store";
import {BrowserRouter} from 'react-router-dom';
import SamuraiJsApp from './App';

//const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<SamuraiJsApp/>);
/*
ReactDOM.render(
    <SamuraiJsApp/>,
document.getElementById('root')
);*/

