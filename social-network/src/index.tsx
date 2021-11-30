import {state, subscribe} from "./Redux/State"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addPost, updateNewPostText} from "./Redux/State"

let rerenderEntireTree = () =>{
 ReactDOM.render( <React.StrictMode>
      <App state={state}  addPost ={addPost} updateNewPostText={updateNewPostText}/>
     </React.StrictMode>,
     document.getElementById('root')
 );}
 rerenderEntireTree();
subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

