import {packsAPI, PackType, ResponsePacksType, UpdatePackType} from "../../api/api";
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
        max: '0',
        sortPacks: ''
    } as QueryParamsType,
}


export const packsReducer = (state: InitialStatePacksType = initialState, action: PacksActionsType): InitialStatePacksType => {
    switch (action.type) {

        case 'PACKS/SET-PACKS-DATA':
            return {
                ...
                    state,cardPacks:[...action.data.cardPacks],
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                token: action.data.token ? action.data.token : "",
                tokenDeathTime: Number(action.data.tokenDeathTime),
                page: action.data.page,
                pageCount: action.data.pageCount
            }

        case "PACKS/SET-QUERY-PARAMS":
            return {...state, params:{...state.params,...action.params} }
        case 'PACKS/SORT-PACKS':
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        default:
            return state;
    }
}

export const setParamsSortPack = (sortParams: string): AppThunk => dispatch => {
    dispatch(sortPackAC(sortParams));
    dispatch(getPacksTC());
}

// actions
export const getPacksAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const setQueryParamsAC = (params: QueryParamsType) => ({type: 'PACKS/SET-QUERY-PARAMS', params} as const)
export const sortPackAC = (sortPacks: string) => ({type: 'PACKS/SORT-PACKS', sortPacks,} as const)


//thunks
export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    const queryParams = getState().packs.params;
    dispatch(setAppStatusAC('loading'));
    try {
        const result = await packsAPI.getPacks({...queryParams})
        dispatch(getPacksAC(result.data));
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
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

export type PacksActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setQueryParamsAC>
    | ReturnType<typeof sortPackAC>


export type InitialStatePacksType = typeof initialState

