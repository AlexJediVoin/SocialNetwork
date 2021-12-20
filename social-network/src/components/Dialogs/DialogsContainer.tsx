import React from "react";
import {
     StoreType
} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";
import StoreContext from "../../StoreContext";


type PropsType = {
    store: StoreType
}

export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (store) => {
                let state = store.getState();

                const onNewMessageChange = (body: string) => {
                    let action = updateNewMessageBodyCreator(body);
                    store.dispatch(action);
                }
                const sendMessageClick = () => {
                    let newMessage = state.dialogPage.newMessageBody;
                    let action = sendMessageCreator(newMessage);
                    store.dispatch(action);
                }
            return <Dialogs onNewMessageChange={onNewMessageChange}
                     sendMessage={sendMessageClick}
                     dialogPage={state.dialogPage}
                     newMessageBody={state.dialogPage.newMessageBody}
            />
            }
        }
        </StoreContext.Consumer>
    )
}