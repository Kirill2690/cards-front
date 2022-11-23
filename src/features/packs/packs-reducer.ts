import {packsAPI, PackType, ResponsePacksType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";


export type QueryParamsType = {
    page?: string
    pageCount?: string
    packName?: string
    userID?: string
    min?: string
    max?: string
}
const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0,
    params: {
        page: '1',
        pageCount: '5',
        packName: '',
        userID: '',
        min: '0',
        max: '0'
    } as QueryParamsType,

}
export type InitialStatePacksType = typeof initialState

export const packsReducer = (state: InitialStatePacksType = initialState, action: PacksActionsType): InitialStatePacksType => {
    switch (action.type) {

        case 'PACKS/SET-PACKS-DATA':
            return {
                ...
                    state,
                cardPacks: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                token: action.data.token ? action.data.token : "",
                tokenDeathTime: Number(action.data.tokenDeathTime),
                page: action.data.page,
                pageCount: action.data.pageCount
            }

        case "PACKS/SET-QUERY-PARAMS":
            return {...state, params: {...action.params}}

        default:
            return state;
    }
}

//ActionCreator
export const getPacksAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const setQueryParamsAC = (params: QueryParamsType) => ({type: 'PACKS/SET-QUERY-PARAMS', params} as const)

//types
export type PacksActionsType = ReturnType<typeof getPacksAC> | ReturnType<typeof setQueryParamsAC>
//thunks

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const queryParams = getState().packs.params;
        const result = await packsAPI.getPacks(queryParams)
        dispatch(getPacksAC(result.data));
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
