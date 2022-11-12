import {authAPI} from "../api/api";
import {AppThunk} from "./store";


const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as string | null,
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)


//thunk
export const authMeTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then((res) => {
            //dispatch()
            //dispatch((res.data))
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
}



//types

export type AppActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof setAppErrorAC>