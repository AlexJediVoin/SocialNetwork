import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../Redux/dialogs-reducer";

import {Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from '../common/FormsControl/FormsControl';
import {maxLenghtCreator, required } from '../../utils/validators/validators';

type PropsType = {
    dialogPage: DialogPageType,
    onNewMessageChange: (text: string) => void,
    sendMessage: (newMessage: string) => void,
    newMessageBody: string,
    isAuth: boolean,
};

type FormDataType = {
    newMessageBody: string
};

const maxLenght50 = maxLenghtCreator(50);

export const Dialogs: React.FC<PropsType> = (props) => {
    let dialogsElements = props.dialogPage.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements = props.dialogPage.messages.map(m =>
        <Message key={m.id} id={m.id} message={m.message}/>);

    const addNewMessage = (value: FormDataType) => {
        props.sendMessage(value.newMessageBody)
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
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const MessageForm: React.FC <InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={"newMessageBody"}
               validate={[required, maxLenght50]}
               placeholder={"Enter your messages...."}/>
        <div>
            <button>Add Message</button>
        </div>
    </form>
}

export const AddMessageForm = reduxForm<FormDataType>({
    form: "newMessageBodyTextArea"
})(MessageForm)