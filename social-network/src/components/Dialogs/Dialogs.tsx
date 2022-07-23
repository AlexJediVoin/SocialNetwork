import {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../Redux/dialogs-reducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    dialogPage: DialogPageType,
    onNewMessageChange: (text: string) => void,
    sendMessage: () => void,
    newMessageBody: string,
    isAuth: boolean
};

export const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElements = props.dialogPage.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements = props.dialogPage.messages.map(m =>
        <Message key={m.id} id={m.id} message={m.message}/>);

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.onNewMessageChange(body);
    };
    const onSendMessageClick = () => {
        props.sendMessage()
    };
  /*  if (!props.isAuth) {
        return <Redirect to={"/Login"}/>
    }*/
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
                    <textarea onChange={onNewMessageChange} value={props.newMessageBody}/>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Add Message</button>
                </div>
            </div>
        </div>
    )
}