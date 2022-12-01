import {authAPI, LoginDataType, packsAPI, PackType, ResponsePacksType, UpdatePackType} from "../../api/api";
import {AppDispatch, AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorUtil} from "../../common/utils/utils-error";
import {setProfileAC} from "../auth/profile/profile-reducer";
import {authLoginAC} from "../auth/login/login-reducer";


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
    } as QueryParamsType,
}


export const packsReducer = (state: InitialStatePacksType = initialState, action: PacksActionsType): InitialStatePacksType => {
    switch (action.type) {

        case 'PACKS/SET-PACKS-DATA':
            return {
                ...state, cardPacks: [...action.data.cardPacks],
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                token: action.data.token ? action.data.token : "",
                tokenDeathTime: Number(action.data.tokenDeathTime),
                page: action.data.page,
                pageCount: action.data.pageCount
            }

        case "PACKS/SET-QUERY-PARAMS":
            return {...state, params: {...state.params, ...action.params}}
        default:
            return state;
    }
}


// actions
export const getPacksAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const setQueryParamsAC = (params: QueryParamsType) => ({type: 'PACKS/SET-QUERY-PARAMS', params} as const)

//thunks
export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    const queryParams = getState().packs.params;
    dispatch(setAppStatusAC('loading'));
    try {
        const result = await packsAPI.getPacks({...queryParams})
        if (result.data.cardPacks.length === 0 && queryParams.packName) {
            throw new Error("The cards with the entered name were not found. Change the query parameters")
        }
        dispatch(getPacksAC(result.data));
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const addPackTC =
    (packName: string, deckCover?: string, isPrivate?: boolean): AppThunk =>
        async dispatch => {
            dispatch(setAppStatusAC('loading'))
            try {
                await packsAPI.createPack(packName, deckCover, isPrivate)
                dispatch(getPacksTC())
            } catch (e) {
                errorUtil(e, dispatch)
            } finally {
                dispatch(setAppStatusAC('idle'))
            }
        }

export const changePackTC = (data: UpdatePackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.updatePack(data)
        dispatch(getPacksTC())
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
        dispatch(getPacksTC())
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//types
export type QueryParamsType = {
    page?: string
    pageCount?: string
    packName?: string
    userID?: string
    min?: string
    max?: string,
    sortPacks?: string,
}
//
export type PacksActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setQueryParamsAC>

export type InitialStatePacksType = typeof initialState

