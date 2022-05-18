import {
    ActionsTypes, PostPageType
} from "../../../Redux/Store";
import {addPostCreator,updateNewPostCreator} from "../../../Redux/profile-reducer"
import {MyPosts} from "./MyPosts";

import store, {AppStateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    profile: PostPageType,
    newPostText: string,
}

type mapDispatchToPropsType = {
    updateNewPostText: (text: string)=>void,
    addPost: () =>void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType =>{
    return {
        profile: state.profilePage,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch <ActionsTypes>): mapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostCreator(text);
            dispatch(action);
        },
        addPost: () => {
            let postText = store.getState().profilePage.newPostText;
            let action = addPostCreator(postText);
            dispatch(action);
        }
    }
}
const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;