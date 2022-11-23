import {cardsAPI, CardsParamsType, CardsType, CreateCardsType, ResponseCardsType, UpdateCardsType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";


const initialStateCards = {
    cards: [] as CardType[],
    cardsTotalCount: 14,
    maxGrade: 5,
    minGrade: 2,
    packCreated: '',
    packDeckCover: null,
    packName: '',
    packPrivate: false,
    packUpdated: '',
    packUserId: '',
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: '',
    min: 0,
    max: 10,
    search: '',
};

export const cardsReducer = (state = initialStateCards, action: ActionCardsType): InitialCardsType => {
    switch (action.type) {
        case "CARDS/GET_CARDS":
            return {...state, ...action.data}
        case 'CARDS/ADD_NEW_CARD':
            return {...state, cards: [action.data, ...state.cards]};
        case 'CARDS/DELETE_CARD':
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.cardId),
            };
        case 'CARDS/UPDATE_CARD':
            return {
                ...state,
                cards: state.cards.map(card =>
                    card._id === action.cardId
                        ? {
                            ...card,
                            question: action.newQuestion,
                        }
                        : card,
                ),
            };
        default:
            return state
    }
}

//actions

export const getCardAC = (data: ResponseCardsType) => ({type: 'CARDS/GET_CARDS', data} as const)
export const addNewCardAC = (data: CardType) => ({type: 'CARDS/ADD_NEW_CARD', data} as const);
export const deleteCardAC = (cardId: string) => ({type: 'CARDS/DELETE_CARD', cardId} as const);
export const updateCardAC = (cardId: string, newQuestion: string) => ({
    type: 'CARDS/UPDATE_CARD',
    cardId,
    newQuestion
} as const);
export const changeCardAC = (data: CardType) => ({type: 'CARDS/CHANGE_CARD', data} as const);

//thunk

/*export const getCardsTC = (cardPackId: string | undefined): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const params =
                getState().cards;
            const res = await cardsAPI.getCards(params);
            dispatch(getCardAC(res.data));
        } catch (e) {
            errorUtil(e, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };*/

/*export const createCardTC = (createCardData: CreateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        await cardsAPI.createCards(createCardData)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const updateCardTC = (updateCardData: UpdateCardsType, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.updateCards(updateCardData)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const deleteCardTC = (cardID: string, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.deleteCards(cardID)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}*/

//types

type InitialCardsType = typeof initialStateCards
type ResponseCardsType = InitialCardsType
export type ActionCardsType = ReturnType<typeof getCardAC>
    | ReturnType<typeof addNewCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof changeCardAC>

export type CardType = {
    answer: string;
    answerImg: string;
    answerVideo: string;
    cardsPack_id: string;
    comments: string;
    created: string;
    grade: number;
    more_id: string;
    question: string;
    questionImg: string;
    questionVideo: string;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    user_id: string;
    __v: number;
    _id: string;
};
