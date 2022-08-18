import {addPostCreator, PostType, ProfilePageActionsType} from "../../../Redux/profile-reducer"
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../Redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type PostPageType = {
    posts: Array<PostType>,
};
type mapStateToPropsType = {
    profile: PostPageType,
};

type mapDispatchToPropsType = {
    addPost: (newTextPost: string) => void,
};
type ActionsTypes = ProfilePageActionsType;

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        profile: state.profilePage,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {
    return {
        addPost: (newTextPost: string) => {
            let action = addPostCreator(newTextPost);
            dispatch(action);
        }
    };
}
const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;