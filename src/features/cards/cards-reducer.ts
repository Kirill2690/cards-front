import {cardsAPI, CardsType, CreateCardsType, ResponseCardsType, UpdateCardsType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";


const initialStateCards = {
    cards: [] as CardsType[],
    packUserId: '',
    packName: '',
    page: 1,
    packId:'',
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
    } as QueryCardsParamsType
}

export const cardsReducer = (state = initialStateCards, action: ActionCardsType): InitialCardsType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-DATA':
            return {
                ...state,
                cards: action.data.cards,
                packUserId: action.data.packUserId,
                packName: action.data.packName,
                page: action.data.page,
                pageCount: action.data.pageCount,
                packId: action.data.packId,
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
        case "CARDS/SET-QUERY-PARAMS": {
            return {...state, params: {...action.params}}
        }
        default:
            return state
    }
}

//actions

export const setCardsDataAC = (data: ResponseCardsType) => ({type: 'CARDS/SET-CARDS-DATA', data} as const)

export const setQueryCardsParamsAC = (params: QueryCardsParamsType) => ({
    type: 'CARDS/SET-QUERY-PARAMS',
    params
} as const)

//thunk

export const setCardsTC = (): AppThunk => async (dispatch, getState) => {
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

export const createCardsTC = (data: CreateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.createCards(data)
        if (data.cardsPack_id) {
            dispatch(setCardsTC())
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
        await cardsAPI.deleteCards(cardID)
        dispatch(setCardsTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardsTC = (card: UpdateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.updateCards(card)
        dispatch(setCardsTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types

type InitialCardsType = typeof initialStateCards
export type ActionCardsType = ReturnType<typeof setCardsDataAC> | ReturnType<typeof setQueryCardsParamsAC>
export type QueryCardsParamsType = {
    cardsPack_id?: string,
    page?: string,
    pageCount?: string,
    cardQuestion?: string
}