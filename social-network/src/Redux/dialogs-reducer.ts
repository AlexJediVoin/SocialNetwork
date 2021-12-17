import {
    ActionsTypes,
    DialogPageType,
    MessageDataPropsType,
    SendMessageCreatorType,
    UpdateNewMessageBodyType
} from "./State";

const SEND_MESSAGE = "ADD-POST-DIALOGS";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

export type DialogPageActionsType = UpdateNewMessageBodyType | SendMessageCreatorType;

const dialogsReducer = (state: DialogPageType, action: ActionsTypes) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newPost: MessageDataPropsType = {
                id: 5,
                message: action.newMessageBody
            };
            state.messages.push(newPost);
            state.newMessageBody = '';
            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state;
        default:
            return state;
    }
}
export const sendMessageCreator = (postText: string): SendMessageCreatorType => {
    return {
        type: SEND_MESSAGE,
        newMessageBody: postText
    }
}

export const updateNewMessageBodyCreator = (text: string): UpdateNewMessageBodyType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        newMessageBody: text
    }
}
export default dialogsReducer;