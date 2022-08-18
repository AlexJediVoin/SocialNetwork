import {
    DialogPageActionsType,
    DialogPageType,
    sendMessageCreator,
} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";
import {compose, Dispatch} from 'redux';
import {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type ActionsTypes = DialogPageActionsType;

type mapStateToPropsType = {
    dialogPage: DialogPageType,
    isAuth: boolean,
}

type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void,
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.data.isAuth,
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>): mapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}

export default compose<React.ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs);