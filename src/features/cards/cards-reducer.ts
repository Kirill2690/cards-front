import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";
import {cardsAPI, CreateCardsType, ResponseCardsType, UpdateCardsType} from "../../api/api";
import {AppThunk} from "../../app/store";


const initialState = {
    cards: [] as CardsType[],
    packUserId: '',
    packName: '',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
    params: {
        cardsPack_id: '',
        page: '1',
        pageCount: '5',
        cardQuestion: ''
    } as QueryParamsType
}

export type QueryParamsType = {
    cardsPack_id?: string,
    page?: string,
    pageCount?: string,
    cardQuestion?: string
}

export type CardsType = {
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


export const cardsReducer= (state = initialState, action: CardsActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-DATA':
            return {
                ...state,
                cards: action.data.cards,
                packUserId: action.data.packUserId,
                packName: action.data.packName,
                page: action.data.page,
                pageCount: action.data.pageCount,
                cardsTotalCount: action.data.cardsTotalCount,
                packPrivate: action.data.packPrivate,
                packDeckCover: action.data.packDeckCover,
                packCreated: action.data.packCreated,
                packUpdated: action.data.packUpdated,
                minGrade: action.data.minGrade,
                maxGrade: action.data.maxGrade,
                token: action.data.token,
                tokenDeathTime: action.data.tokenDeathTime
            }
        case "CARDS/SET-URL-PARAMS": {
            return {...state, params: {...action.params}}
        }
        default:
            return state
    }
}


//action creators
export const setCardsDataAC = (data: ResponseCardsType) => ({type: 'CARDS/SET-CARDS-DATA', data} as const)

export const setQueryCardsParamsAC = (params: QueryParamsType) => ({type: 'CARDS/SET-URL-PARAMS', params} as const)


//thunks
export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
    const urlParams = getState().cards.params
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards({...urlParams})
        dispatch(setCardsDataAC(res.data))
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const addCardTC = (data: CreateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.addCard(data)
        if (data.cardsPack_id) {
            dispatch(getCardsTC())
        }
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteCardsTC = (cardID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.deleteCard(cardID)
        dispatch(getCardsTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardsTC = (card: UpdateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.updateCard(card)
        dispatch(getCardsTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types

export type InitialStateType = typeof initialState

export type CardsActionType =
    | ReturnType<typeof setCardsDataAC>
    | ReturnType<typeof setQueryCardsParamsAC>
