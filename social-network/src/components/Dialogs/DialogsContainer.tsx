import {
    ActionsTypes,
    RootStateProps
} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer"
import {Dialogs} from "./Dialogs";
import {Dispatch} from 'redux';
import store from "../../Redux/redux-store";
import {connect} from "react-redux";


let mapStateToProps = (state: RootStateProps) => {
    return {
        dialogPage: state.dialogPage,
        newMessageBody: state.dialogPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {
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
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;