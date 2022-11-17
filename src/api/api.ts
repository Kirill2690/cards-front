import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})


export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/me')
    },
    authMe() {
        return instance.post<{}, AxiosResponse<ResponseType>>('/auth/me')
    },
    authRegister(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<ResponseType>>('auth/register', data)
    },
    changeUserName(name: string) {
        return instance.put<{name:string}, AxiosResponse<ResponseUpdatesUserType>>('auth/me', name)
    },
    forgotPassword(data:ForgotDataType) {
        return instanceHeroku.post<ForgotDataType, AxiosResponse<ForgotDataResponseType>>('auth/forgot',data)
    },
    setNewPassword(data: SetNewPasswordType) {
        return instanceHeroku.post<SetNewPasswordType, AxiosResponse<ResponseNewPasswordType>>('auth/set-new-password', data)
    },
}



//type
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
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
    updatedUser:UserType

}

export type ResponseForgotType = {
    info: string
    error: string
}
export type RegisterDataType = {
    email: string
    password: string
}

export type ChangeUserNameDataType = {
    name?: string
}
export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}


export type ResponseNewPasswordType={
    info: string
    error: string
}

export type ForgotDataType = {
    email: string
    message: string
}

export type ForgotDataResponseType = {
    info: string
    error: string
}
export type UserType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}