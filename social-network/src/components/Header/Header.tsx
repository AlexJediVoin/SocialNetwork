import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
}
export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsvxI-cGsF7dSoYBmfQ3ufH76ekG7d9FZTA&usqp=CAU"
                alt="logo"/>
            <div className={s.loginBlock}>

                {
                    props.isAuth === true ? props.login : <NavLink to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    )
}