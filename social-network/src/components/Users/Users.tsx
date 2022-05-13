import {UserType} from "../../Redux/users-reducer";
import styles from "./Users.module.css";
import axios from "axios";
import photoUser from '../../assets/images/user.png'

type PropsType = {
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}
const Users = (props: PropsType) => {

    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={styles.userPhoto}
                             src={u.photos.small !==  null ? u.photos.small : photoUser}
                             alt="Аватарка пользователя"/>
                    </div>
                    <div>
                        {
                            u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}> Follow </button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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
export default Users;
