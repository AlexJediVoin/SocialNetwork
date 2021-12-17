import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    ActionsTypes,
    DialogPageType
} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer"

type PropsType = {
    dialogPage: DialogPageType
    dispatch: (action: ActionsTypes) => void
}

export const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogPage.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements = props.dialogPage.messages.map(m =>
        <Message key={m.id} id={m.id} message={m.message}/>);

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        let action = updateNewMessageBodyCreator(body);
        props.dispatch(action);
    }
    const onSendMessageClick = () => {
        let newMessage = props.dialogPage.newMessageBody;
        let action = sendMessageCreator(newMessage);
        props.dispatch(action);
    }
    return (
        <div>

            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
                <div>
                    <textarea onChange={onNewMessageChange} value={props.dialogPage.newMessageBody}/>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Add Message</button>
                </div>
            </div>
        </div>
    )
}