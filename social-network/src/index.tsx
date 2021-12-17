import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./Redux/Store";
import {Provider} from "react-redux";

let rerenderEntireTree = () => {
    ReactDOM.render(<React.StrictMode>
            <App store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree();
store.subscribe(rerenderEntireTree);

