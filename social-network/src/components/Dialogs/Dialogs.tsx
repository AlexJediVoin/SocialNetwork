import React from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../Redux/State";

type PropsType = {
    dialogPage: DialogPageType
}

export const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogPage.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements = props.dialogPage.messages.map(m =>
        <Message key={m.id} id={m.id} message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}