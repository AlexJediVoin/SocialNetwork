import React from "react";
import s from './../Dialogs.module.css';

type MessageDataPropsType = {
    id: number
    message: string
}

export const Message: React.FC<MessageDataPropsType> = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}