import React, {ChangeEvent} from "react";
import {useState} from "react";
import {useEffect} from "react";

type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void,
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);
    const activateEditMode = () => {
        setEditMode(true)
    }
    const dactivateEditMode = () => {
        props.updateStatus(status);
        setEditMode(false)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    return (<div>
        {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
            </div>
        }
        {editMode &&
            <div>
                <input autoFocus onBlur={dactivateEditMode} onChange={onStatusChange} value={status}
                ></input>
            </div>
        }
    </div>)
}

export default ProfileStatusWithHooks;