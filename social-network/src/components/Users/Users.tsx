import styles from "./Users.module.css";
import axios from "axios";
import photoUser from '../../assets/images/user.png'
import {MapDispatchPropsType, MapStateToPropsType} from "./UsersContainer";
import * as React from 'react';

type PropsType = MapStateToPropsType & MapDispatchPropsType

/*{
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}*/
class Users extends React.Component<PropsType, MapStateToPropsType> {

    getUsers = () => {
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }

    render() {
        this.getUsers()
        return <div>
            {/*<button onClick={this.getUsers}>Get Users</button>*/}
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={styles.userPhoto}
                             src={u.photos.small !== null ? u.photos.small : photoUser}
                             alt="Аватарка пользователя"/>
                    </div>
                    <div>
                        {
                            u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}> Follow </button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
                                }}> UnFollow </button>
                        }
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

                </div>)
            }
        </div>
    }
}

export default Users;
