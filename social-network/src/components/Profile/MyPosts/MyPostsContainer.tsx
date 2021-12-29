import {
    ActionsTypes,
    RootStateProps
} from "../../../Redux/Store";
import {addPostCreator,updateNewPostCreator} from "../../../Redux/profile-reducer"
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import store from "../../../Redux/redux-store";

const mapStateToProps = (state: RootStateProps) =>{
    return {
        profile: state.profilePage,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch <ActionsTypes>) => {
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
const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;