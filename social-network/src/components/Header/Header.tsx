import React from "react";
import s from "./Header.module.css";

export const Header = () => {
    return (
        <header className={s.header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsvxI-cGsF7dSoYBmfQ3ufH76ekG7d9FZTA&usqp=CAU" alt="logo"/>
        </header>
    )
}