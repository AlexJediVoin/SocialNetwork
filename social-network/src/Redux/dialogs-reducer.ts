import {
    ActionsTypes,
    DialogPageType,
    MessageDataPropsType,
    SendMessageCreatorType,
    UpdateNewMessageBodyType
} from "./Store";

const SEND_MESSAGE = "ADD-POST-DIALOGS";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

export type DialogPageActionsType = UpdateNewMessageBodyType | SendMessageCreatorType;

let initialState: DialogPageType = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Vanya"},
        {id: 3, name: "Valera"},
        {id: 4, name: "Sasha"},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you man?"},
        {id: 3, message: "Yo!"},
        {id: 4, message: "Look is him xD!"},
    ],
    newMessageBody: ""
}
const dialogsReducer = (state = initialState, action: ActionsTypes): DialogPageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newPost: MessageDataPropsType = {
                id: 5,
                message: action.newMessageBody
            };
            state.messages.push(newPost);
            state.newMessageBody = '';
            return {...state};
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return {...state};
        default:
            return {...state};
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