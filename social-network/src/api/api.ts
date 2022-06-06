import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "96a18d4f-33c1-4ced-87aa-45d672260070"
    }
})

export const usersAPI =  {
     getUsers: (currentPage = 1,pageSize = 10): Promise<any> => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data).catch((err)=> new Error("Ошибка запроса на получение пользователей!"));
    },
}

export const followAPI = {
    followUser: (userId =0) => {
        return instance.post(`follow/${userId}`).then(response => response.data).catch((err)=> new Error("Ошибка запроса на получение профиль пользователя!"));
    },
    unfollowUser: (userId =0) => {
        return instance.delete(`follow/${userId}`).then(response => response.data).catch((err)=> new Error("Ошибка запроса на получение профиль пользователя!"));
    },
}

export const profileAPI = {
    setUserProfile: (userId ="1") => {
        return instance.get(`profile/${userId}`)
            .then(response => response.data).catch((err)=> new Error("Ошибка запроса на получение профиль пользователя!"));
    },
}

