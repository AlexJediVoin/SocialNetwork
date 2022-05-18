const SEND_MESSAGE = "ADD-POST-DIALOGS";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

export type MessageDataType = {
    id: number
    message: string
}
export type DialogItemType = {
    id: number
    name: string
}
export type DialogPageType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageDataType>
    newMessageBody: string
}
export type SendMessageCreatorType = {
    type: "ADD-POST-DIALOGS"
    newMessageBody: string
}
export type UpdateNewMessageBodyType = {
    type: "UPDATE-NEW-MESSAGE-BODY"
    newMessageBody: string
}
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
const dialogsReducer = (state = initialState, action: DialogPageActionsType): DialogPageType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newPost: MessageDataType = {
                id: 5,
                message: action.newMessageBody
            };
            return {
                ...state,
                messages: [...state.messages, newPost],
                newMessageBody: ''
            }
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.newMessageBody
            }
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