let onChange = () => {

}

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
// export type DialogsPropsType = {
//     dialogs: Array<DialogItemPropsType>
//     messages: Array <MessageDataPropsType>
// }

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

export const addPost = () => {
    let newPost: PostType = {
        id: 5,
        message: state.postPage.newPostText,
        likesCount: 0
    };

    state.postPage.posts.push(newPost);
    state.postPage.newPostText = '';
    onChange();
}
export type UpdateNewPostTextPropsType = {
    updateNewPostText: (text: string) => void
}
export const updateNewPostText = (text: string) => {
    state.postPage.newPostText = text;
    onChange();
}
export const subscribe = (callback: ()=>void) => {
    onChange = callback;
}

export let state: RootStateProps = {
    dialogPage: {
        dialogs: Dialogs,
        messages: Messages
    },
    postPage: {
        posts: PostData,
        newPostText: '',
    }
}

export type addPostCallbackPropsType = {
    addPostCallback: () => void
}

