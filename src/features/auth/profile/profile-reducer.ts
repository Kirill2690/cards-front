import {authAPI, ChangeUserDataType, UserType} from "../../../api/api";
import {AppDispatch, AppThunk} from "../../../app/store";
import {errorUtil} from "../../../common/utils/utils-error";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authLoginAC} from "../login/login-reducer";


const initialState = {
    avatar: '' as string |undefined,
    email: '',
    name: '' as string |undefined,
    _id: ''
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-NEW-PROFILE':
            return {...state, ...action.user};
        case 'CHANGE-USER-INFO':
            if (action.data) {
                return {
                    ...state,
                    avatar: action.data.avatar,
                    name: action.data.name
                }
            } else return {...state}

        default:
            return state
    }
}

//actions
export const updateUserInfoAC = (data: ChangeUserDataType) => ({type: 'CHANGE-USER-INFO', data} as const)
export const setProfileAC = (user: UserType | null) => ({type: 'SET-NEW-PROFILE', user} as const);


//
//thunks
export const changeUserInfoTC = (data: ChangeUserDataType): AppThunk => (dispatch: AppDispatch) => {
    authAPI.changeUserProfileData(data)
        .then(() => {
            dispatch(updateUserInfoAC(data))
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
export type SetNewUserNameACType = ReturnType<typeof updateUserInfoAC>


