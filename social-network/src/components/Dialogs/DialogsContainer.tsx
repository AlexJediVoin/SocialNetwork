import {
    DialogPageActionsType,
    DialogPageType,
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";
import {compose, Dispatch} from 'redux';
import store, {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type ActionsTypes = DialogPageActionsType;

type mapStateToPropsType = {
    dialogPage: DialogPageType,
    isAuth: boolean,
    newMessageBody: string,
}

type mapDispatchToPropsType = {
    onNewMessageChange: (body: string) => void
    sendMessage: () => void
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth,
        newMessageBody: state.dialogPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {
    return {
        onNewMessageChange: (body: string) => {
            let action = updateNewMessageBodyCreator(body);
            dispatch(action);
        },
        sendMessage: () => {
            let newMessage = store.getState().dialogPage.newMessageBody;
            dispatch(sendMessageCreator(newMessage));
        }
    }
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs);