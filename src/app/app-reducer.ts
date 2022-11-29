import {authAPI} from "../api/api";
import {AppThunk} from "./store";
import {authLoginAC} from "../features/auth/login/login-reducer";
import {setProfileAC} from "../features/auth/profile/profile-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as string | null,
}
//
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
    authAPI.authMe()
        .then((res) => {
            dispatch(authLoginAC(true));
            dispatch(setProfileAC(res.data));
            dispatch(setAppStatusAC('succeeded'))
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}

//types
export type AppActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof setAppErrorAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
