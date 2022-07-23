import React from "react";
import Preloader from "../../../common/Prealoder/Preloader";

type PropsType = {
    status: string;
}

class ProfileStatus extends React.Component<PropsType> {
    state = {
        editeMode: false
    }

    activateEditeMode =() => {
        this.setState({
            editeMode: true
        })
    }

    deactivateEditeMode = () =>{
        this.setState({
            editeMode: false
        })
    }

    render() {
        return (<div>
            {!this.state.editeMode ?
                <div>
                    <span onDoubleClick={this.activateEditeMode}>{this.props.status}</span>
                </div>
                :
                <div>
                    <input autoFocus onBlur={this.deactivateEditeMode} value={this.props.status}></input>
                </div>
            }
        </div>)
    }
}

export default ProfileStatus;