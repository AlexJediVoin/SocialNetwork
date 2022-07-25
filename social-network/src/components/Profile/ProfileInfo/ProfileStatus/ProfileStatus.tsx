import React, {ChangeEvent} from "react";
import Preloader from "../../../common/Prealoder/Preloader";

type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void,
}

type StateType = {
    editeMode: boolean,
    status: string,
}

class ProfileStatus extends React.Component<PropsType> {
    state: StateType = {
        editeMode: false,
        status: this.props.status,
    }

    activateEditeMode = () => {
        this.setState({
            editeMode: true
        })
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    deactivateEditeMode = () => {
        this.setState({
            editeMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.state.status
            })
        }
    }

    render() {
        return (<div>
            {!this.state.editeMode ?
                <div>
                    <span onDoubleClick={this.activateEditeMode}>{this.props.status || "-------"}</span>
                </div>
                :
                <div>
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditeMode}
                           value={this.state.status}></input>
                </div>
            }
        </div>)
    }
}

export default ProfileStatus;