import {
    cardsAPI,
    CardType,
    CreateCardsType,
    NewCardType,
    ResponseCardsType,
    UpdateCardsType
} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";
import {AxiosError} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const initialState = {
    cards: [] as CardType[],
    card: {} as CardType,
    packUserId: '',
    params: {
        cardsPack_id: '',
        page: 1,
        pageCount: 10,
        cardsTotalCount: 0,
        cardQuestion: '',
        cardAnswer: '',
    },
    minGrade: 0,
    maxGrade: 6,
}


export const cardsReducer = (state = initialState, action: ActionCardsType): InitialCardsType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS':
            return {...state, cards: action.cards}
        case 'CARDS/SET-PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'CARDS/SET-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'CARDS/SET-CARDS-TOTAL-COUNT':
            return {...state, params: {...state.params, cardsTotalCount: action.cardsTotalCount}}
        case 'CARDS/SEARCH-QUESTION':
            return {
                ...state,
                params: {...state.params, cardQuestion: action.cardQuestion}
            }
        case 'CARDS/SET-PACK-USER-ID':
            return {...state, packUserId: action.packUserId}
        case 'CARDS/SEARCH-ANSWER':
            return {...state, params: {...state.params, cardAnswer: action.cardAnswer}}
        default:
            return state

    }
}

//actions
export const getCardsAC = (cards: CardType[]) => ({type: 'CARDS/GET-CARDS', cards,} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'CARDS/SET-PACK-USER-ID', packUserId,} as const)
export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET-PAGE', page,} as const)
export const setCardsPageCountAC = (pageCount: number) => ({type: 'CARDS/SET-PAGE-COUNT', pageCount,} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: 'CARDS/SET-CARDS-TOTAL-COUNT',
    cardsTotalCount,
} as const)
export const searchQuestionAC = (cardQuestion: string) => ({
    type: 'CARDS/SEARCH-QUESTION',
    cardQuestion,
} as const)
export const searchAnswerAC = (cardAnswer: string) => ({
    type: 'CARDS/SEARCH-ANSWER',
    cardAnswer,
} as const)


export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState) => {
        const {params} = getState().cards
        dispatch(setAppStatusAC('loading'))
        cardsAPI.getCards(cardsPack_id, params)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
                dispatch(setPackUserIdAC(res.data.packUserId))
                dispatch(setCardsPageAC(res.data.page))
                dispatch(setCardsPageCountAC(res.data.pageCount))
                dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtil(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addCardTC = (data: CreateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.addCard(data)
        if (data.cardsPack_id) {
            dispatch(getCardsTC(data.cardsPack_id))
        }
    } catch {
        errorUtil(error, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deleteCardTC = (cardId: string, packsId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.deleteCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(packsId))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtil(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const updateCardTC = (data: UpdateCardsType, packId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.updateCard(data)
            .then(() => {
                dispatch(getCardsTC(packId))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtil(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}


//types

type InitialCardsType = typeof initialState
export type ActionCardsType = ReturnType<typeof getCardsAC>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setCardsPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof searchQuestionAC>
    | ReturnType<typeof searchAnswerAC>
