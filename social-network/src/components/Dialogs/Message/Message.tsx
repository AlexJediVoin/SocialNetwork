import React from "react";
import { MessageDataPropsType } from "../../../Redux/State";
import s from './../Dialogs.module.css';

export const Message: React.FC<MessageDataPropsType> = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}