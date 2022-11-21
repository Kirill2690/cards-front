import {CreatePacksType, packsAPI, PackType, ResponsePacksType, UpdatePackType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    params: {
        page: '1',
        pageCount: '5',
        packName: '',
        userID: '',
        min: '0',
        max: '0'
    } as QueryParamsType,
    exitDeletion: false
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {
                ...
                    state,
                cardPacks: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                token: action.data.token,
                tokenDeathTime: action.data.tokenDeathTime,
                page: action.data.page,
                pageCount: action.data.pageCount
            }
        case "PACKS/SET-QUERY-PARAMS": {
            return {...state, params: {...action.params}}
        }
        default:
            return state
    }
}

//actions
export const setPacksDataAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const setQueryParamsAC = (params: QueryParamsType) => ({type: 'PACKS/SET-QUERY-PARAMS', params} as const)

//thunks
export const setPacksTC = (): AppThunk => async (dispatch, getState) => {
    const queryParams = getState().packs.params
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await packsAPI.getPacks({...queryParams})
        dispatch(setPacksDataAC(res.data))
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const deletePackTC = (data: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.deletePack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const changePackTC = (data: UpdatePackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.updatePack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const addNewPackTC = (data: CreatePacksType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.createPack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//types
export type InitialPacksStateType = typeof initialState
export type PacksActionsType=ReturnType<typeof setPacksDataAC>|ReturnType<typeof setQueryParamsAC>
export type QueryParamsType  = {
    page?: string
    pageCount?: string
    packName?: string
    userID?: string
    min?: string
    max?: string
}