import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

//authAPI

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
    changeUserName(name:string) {
        return instance.put<{name:string}, AxiosResponse<{updateUser:UserType}>>('auth/me', {name})
    },
    forgotPassword(data:ForgotDataType) {
        return instanceHeroku.post<ForgotDataType, AxiosResponse<ForgotDataResponseType>>('auth/forgot',data)
    },
    setNewPassword(data: SetNewPasswordType) {
        return instanceHeroku.post<SetNewPasswordType,AxiosResponse<ResponseNewPasswordType>>('auth/set-new-password', data)
    },
}

//packsAPI

export const packsAPI = {

    getPacks(data:PacksParamsType){
        return instance.get<ResponsePacksType>(`cards/pack`,{
            params:{
                page: data.page,
                pageCount: data.pageCount,
                packName: data.packName,
                user_id: data.userID,
                min: data.min,
                max: data.max,
                sortPacks:data.sortPacks
            }
        })
    },
    createPack(name: string,deckCover?:string, isPrivate?:boolean) {
        return instance.post('cards/pack', {cardsPack: {name, deckCover, private: isPrivate}})
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put('cards/pack', {cardsPack})
    },
    deletePack(packID: string) {
        return instance.delete(`cards/pack?id=${packID}`)
    },
}

//cardsAPI

export const cardsAPI={
    getCards(data: CardsParamsType) {
    return instance.get<ResponseCardsType>(`cards/card`, {
        params: {
            page: data.page,
            pageCount: data.pageCount,
            cardQuestion: data.cardQuestion,
            cardsPack_id: data.cardsPack_id
        }
    })
},
    deleteCard(id: string) {
        return instance.delete(`/cards/card/?id=${id}`)
    },
    addCard(card: CreateCardsType) {
        return instance.post(`/cards/card`, {card})
    },
    updateCard(card: UpdateCardsType) {
        return instance.put(`/cards/card`, {card})
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
    success: boolean
    answer: boolean
    html: boolean
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
    avatar?: string
    created?: string
    email?: string
    isAdmin?: boolean
    name?: string
    publicCardPacksCount?: number
    rememberMe?: boolean
    token?: string
    tokenDeathTime?: number
    updated?: string
    verified?: boolean
    __v?: number
    _id?: string
}


//types packAPI
export type PacksParamsType = {
    page?: string,
    pageCount?: string,
    packName?: string
    userID?: string
    min?: string
    max?: string
    sortPacks?:string
    //
}

export type ResponsePacksType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}

export type UpdatePackType={
    _id: string
    name?: string
}

//type cardsAPI
export type ResponseCardsType = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}


export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type CreateCardsType = {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardsType = {
    _id: string
    question?: string
    answer?: string
}


export type CreatePacksType = {
    name: string
    deckCover?: string
    private?: boolean
}
export type NewCardType = {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
}

export type RequestGetCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsParamsType = {
    page?: string,
    pageCount?: string,
    cardQuestion?: string
    cardsPack_id?: string
}




