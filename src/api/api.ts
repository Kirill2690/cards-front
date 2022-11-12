import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})


export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<AxiosResponse<ResponseType>>('/auth/me')
    },
    authMe() {
        return instance.post<{}, AxiosResponse<ResponseType>>('/auth/me')
    },
    authRegister(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<ResponseType>>('auth/register', data)
    },
    changeUserName(data: ChangeUserNameDataType) {
        return instance.put<ChangeUserNameDataType, AxiosResponse<ResponseUpdatesUserType>>('auth/me', data)
    },

}

//type
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;// подтвердил ли почту
    publicCardPacksCount: number;// количество колод
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}

export type ResponseUpdatesUserType = {
    token: string
    tokenDeathTime: string

}

export type ResponseForgotType = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
}
export type RegisterDataType = {
    email: string
    password: string
}

export type ChangeUserNameDataType = {
    name?: string
}