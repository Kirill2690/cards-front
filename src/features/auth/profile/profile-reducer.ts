import {authAPI, UserType} from "../../../api/api";
import {AppDispatch, AppThunk} from "../../../app/store";
import {errorUtil} from "../../../common/utils/utils-error";
import {setAppStatusAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../login/login-reducer";


const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    rememberMe: false,
}

type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-NEW-PROFILE':
            return { ...state, ...action.user };
        case "CHANGE-USER-NAME":
            return { ...state, name: action.newText }
        default:
            return state
    }
}

export const updateUserNameAC = (newText: string) => ({type: 'CHANGE-USER-NAME', newText} as const)
export const setProfileAC = (user: UserType | null) => ({ type: 'SET-NEW-PROFILE', user } as const);

export type ProfileActionType =
    | SetProfileACType
    | SetNewUserNameACType

export type SetProfileACType = ReturnType<typeof setProfileAC>
export type SetNewUserNameACType = ReturnType<typeof updateUserNameAC>


export const changeUserNameTC = (name: string): AppThunk => (dispatch: AppDispatch) => {
    authAPI.changeUserName(name)
        .then(() => {
            dispatch(updateUserNameAC(name))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtil(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setProfileAC(null))
        dispatch(setAppStatusAC('succeeded'))
    } catch(e) {
        errorUtil(e, dispatch)
    }
}


