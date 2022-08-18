import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    logout: ()=>void
}
export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsvxI-cGsF7dSoYBmfQ3ufH76ekG7d9FZTA&usqp=CAU"
                alt="logo"/>
            <div className={s.loginBlock}>

                {
                    props.isAuth === true ?
                        <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    )
}