import {UserType} from "../../Redux/users-reducer";
import styles from "./Users.module.css";

type PropsType = {
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}
const Users = (props: PropsType) => {
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={styles.userPhoto} src={u.photoUrl} alt="Аватарка пользователя"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Follow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>UnFollow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullname}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>

            </div>)
        }
    </div>
}
export default Users;
