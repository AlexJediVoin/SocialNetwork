import axios from "axios";
import {UserProfileType} from "../Redux/profile-reducer";
import {UserType} from "../Redux/users-reducer";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "2aa454df-5c09-4e9d-a457-e6e882c52689"
    }
})

export enum ResultCodesEnum {
    Sucsess = 0,
    Error = 1
}

export type getUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}
type followAPIUserType = {
    resultCode: ResultCodesEnum
    messages: string[],
    data: {}
}
type authMeType = {
    resultCode: ResultCodesEnum
    messages: string[],
    data: {
        id: number,
        email: string,
        login: string
    }
}

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
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
    getProfile: (userId: string) => {
        return instance.get<UserProfileType>(`profile/${userId}`).then(response => response.data);
    },
}

export const authApi = {
    me: () => {
        return instance.get<authMeType>(`auth/me`).then(response => response.data);
    },
}

