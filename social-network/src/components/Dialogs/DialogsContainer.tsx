import {
    DialogPageActionsType,
    DialogPageType,
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";
import {Dispatch} from 'redux';
import store, {AppStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";

type ActionsTypes =DialogPageActionsType;

type mapStateToPropsType = {
    dialogPage: DialogPageType,
    newMessageBody: string,
}

type mapDispatchToPropsType = {
    onNewMessageChange: (body: string) => void
    sendMessage: () => void
}


let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogPage: state.dialogPage,
        newMessageBody: state.dialogPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>):mapDispatchToPropsType => {
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
const DialogsContainer = connect<mapStateToPropsType,mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;