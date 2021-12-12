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
export type AddPostActionType = {
    type: "ADD-POST",
    postText: string
}
export type UpdateNewPostActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    updateText: string
}
export let store: StoreType = {
    _state: {
        dialogPage: {
            dialogs: Dialogs,
            messages: Messages
        },
        postPage: {
            posts: PostData,
            newPostText: '',
        }
    },
    getState() {
        return this._state;
    },
    dispatch (action) {
        if (action.type === "ADD-POST") {
            let newPost: PostType = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            this._state.postPage.posts.push(newPost);
            this._state.postPage.newPostText = '';
            this._callSubscriber();
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.postPage.newPostText = action.updateText;
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
    }
}

export type StoreType = {
    _state: RootStateProps,
    _callSubscriber: () => void
    getState: () => RootStateProps,
    dispatch: (action: AddPostActionType | UpdateNewPostActionType ) => void
    addPost: () => void,
    updateNewPostText: (text: string) => void,
    subscribe: (callback: () => void) => void,
}
