import React from "react";
import {
     StoreType
} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";

type PropsType = {
    store: StoreType
}

export const DialogsContainer: React.FC<PropsType> = (props) => {
    let state = props.store.getState();

    const onNewMessageChange = (body: string) => {
        let action = updateNewMessageBodyCreator(body);
        props.store.dispatch(action);
    }
    const sendMessageClick = () => {
        let newMessage = state.dialogPage.newMessageBody;
        let action = sendMessageCreator(newMessage);
        props.store.dispatch(action);
    }
    return (
        <Dialogs onNewMessageChange={onNewMessageChange}
                 sendMessage={sendMessageClick}
                 dialogPage={state.dialogPage}
                 newMessageBody={state.dialogPage.newMessageBody}
        />
    )
}