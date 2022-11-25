import {authAPI, UserType} from "../../../api/api";
import {AppDispatch, AppThunk} from "../../../app/store";
import {errorUtil} from "../../../common/utils/utils-error";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authLoginAC} from "../login/login-reducer";


const initialState = {
    avatar: '',
    email: '',
    name: '',
    _id: ''
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-NEW-PROFILE':
            return {...state, ...action.user};
        case "CHANGE-USER-NAME":
            return {...state, name: action.newText}
        default:
            return state
    }
}

//actions
export const updateUserNameAC = (newText: string) => ({type: 'CHANGE-USER-NAME', newText} as const)
export const setProfileAC = (user: UserType | null) => ({type: 'SET-NEW-PROFILE', user} as const);



//thunks
export const changeUserNameTC = (name: string): AppThunk => (dispatch: AppDispatch) => {
    authAPI.changeUserName(name)
        .then(() => {
            dispatch(updateUserNameAC(name))
        })
        .catch(e => {
            errorUtil(e, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.logout()
        dispatch(authLoginAC(false))
        dispatch(setProfileAC(null))
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}


//types

type InitialStateType = typeof initialState
export type ProfileActionType =
    | SetProfileACType
    | SetNewUserNameACType

export type SetProfileACType = ReturnType<typeof setProfileAC>
export type SetNewUserNameACType = ReturnType<typeof updateUserNameAC>


