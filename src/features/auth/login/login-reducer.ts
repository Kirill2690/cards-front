import {authAPI, LoginDataType} from "../../../api/api";
import {AppThunk} from "../../../app/store";
import {setAppStatusAC} from "../../../app/app-reducer";
import {errorUtil} from "../../../common/utils/utils-error";
import {setProfileAC} from "../profile/profile-reducer";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType=typeof initialState
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export type LoginActionType = SetIsLoggedInActionType

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'SET-IS-LOGGED-IN', isLoggedIn} as const)

//thunks
export const loginTC = (data: LoginDataType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setProfileAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        errorUtil(e, dispatch)
    }
}