const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SEND_MESSAGE = "ADD-POST-DIALOGS";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type MessageDataPropsType = {
    id: number
    message: string
}
export type DialogItemPropsType = {
    id: number
    name: string
}

export type PostPageType = {
    posts: Array<PostType>
    newPostText: string
}

export type DialogPageType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessageDataPropsType>
    newMessageBody: string
}

export type RootStateProps = {
    dialogPage: DialogPageType,
    postPage: PostPageType
}

let Dialogs: Array<DialogItemPropsType> = [
    {id: 1, name: "Dimych"},
    {id: 2, name: "Vanya"},
    {id: 3, name: "Valera"},
    {id: 4, name: "Sasha"},
]
let Messages: Array<MessageDataPropsType> = [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you man?"},
    {id: 3, message: "Yo!"},
    {id: 4, message: "Look is him xD!"},
]
let PostData: Array<PostType> = [
    {id: 1, message: "Hi, how are you?", likesCount: 2},
    {id: 2, message: "It's my first post.", likesCount: 5},
    {id: 3, message: "Hi, how are you?", likesCount: 2},
    {id: 4, message: "It's my first post.", likesCount: 5}
]
export type AddPostCreatorType = {
    type: "ADD-POST",
    postText: string
}
export type UpdateNewPostCreatorType = {
    type: "UPDATE-NEW-POST-TEXT",
    updateText: string
}
export type SendMessageCreatorType = {
    type: "ADD-POST-DIALOGS"
    newMessageBody: string
}
export type UpdateNewMessageBodyType = {
    type: "UPDATE-NEW-MESSAGE-BODY"
    newMessageBody: string
}


export type ActionsTypes =
    AddPostCreatorType | UpdateNewPostCreatorType |
    UpdateNewMessageBodyType | SendMessageCreatorType;

export let store: StoreType = {
    _state: {
        dialogPage: {
            dialogs: Dialogs,
            messages: Messages,
            newMessageBody: ""
        },
        postPage: {
            posts: PostData,
            newPostText: '',
        }
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost: PostType = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            this._state.postPage.posts.push(newPost);
            this._state.postPage.newPostText = '';
            this._callSubscriber();
        } else if (action.type === SEND_MESSAGE) {
            let newPost: MessageDataPropsType = {
                id: 5,
                message: action.newMessageBody
            };
            this._state.dialogPage.messages.push(newPost);
            this._state.dialogPage.newMessageBody = '';
            this._callSubscriber();
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.postPage.newPostText = action.updateText;
            this._callSubscriber();
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogPage.newMessageBody = action.newMessageBody;
            this._callSubscriber();
        }
    },
    addPost() {
        let newPost: PostType = {
            id: 5,
            message: store._state.postPage.newPostText,
            likesCount: 0
        };
        this._state.postPage.posts.push(newPost);
        this._state.postPage.newPostText = '';
        this._callSubscriber();
    },
    updateNewPostText(text) {
        this._state.postPage.newPostText = text;
        this._callSubscriber();
    },
    subscribe(callback) {
        this._callSubscriber = callback;
    },
    _callSubscriber() {
        console.log("state changed.")
    },
}

export type StoreType = {
    _state: RootStateProps
    _callSubscriber: () => void
    getState: () => RootStateProps,
    dispatch: (action: ActionsTypes) => void
    addPost: () => void
    updateNewPostText: (text: string) => void
    subscribe: (callback: () => void) => void
}
export const addPostCreator = (postText: string): AddPostCreatorType => {
    return {
        type: ADD_POST,
        postText: postText
    }
}
export const sendMessageCreator = (postText: string): SendMessageCreatorType => {
    return {
        type: SEND_MESSAGE,
        newMessageBody: postText
    }
}
export const updateNewPostCreator = (text: string): UpdateNewPostCreatorType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        updateText: text
    }
}
export const updateNewMessageBodyCreator = (text: string): UpdateNewMessageBodyType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        newMessageBody: text
    }
}