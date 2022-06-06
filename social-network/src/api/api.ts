import axios from "axios";
import { UserProfileType } from "../Redux/profile-reducer";
import { UserType } from "../Redux/users-reducer";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "96a18d4f-33c1-4ced-87aa-45d672260070"
    }
})
   // .catch((err)=> new Error("Ошибка запроса на получение пользователей!"))
export enum ResultCodesEnum {
    Sucsess = 0,
    Error = 1
}

type getUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}
type followAPIUserType = {
    resultCode: ResultCodesEnum
    messages: string[],
    data: {}
}

export const usersAPI =  {
     getUsers: (currentPage :number,pageSize:number)=> {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
}

export const followAPI = {
    followUser: (userId: number) => {
        return instance.post<followAPIUserType>(`follow/${userId}`).then(response => response.data)
    },
    unfollowUser: (userId: number) => {
        return instance.delete<followAPIUserType>(`follow/${userId}`).then(response => response.data)
    },
}

export const profileAPI = {
    setUserProfile: (userId: string) => {
        return instance.get<UserProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
}

