import {setAppStatusAC} from "../../../../app/app-reducer";
import {AxiosError} from "axios";
import {errorUtil} from "../../../../common/utils/utils-error";
import {AppThunk} from "../../../../app/store";
import {authAPI, SetNewPasswordType} from "../../../../api/api";


const initialState = {
    newPasswordSuccess: false
}

export const newPasswordReducer = (state: InitialStateType=initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'NEW-PASSWORD-SUCCESS':
            return {...state, newPasswordSuccess: action.newPassword}
        default:
            return state
    }
}

// thunks
export const setNewPasswordTC = (data: SetNewPasswordType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.setNewPassword(data)
            .then((res) => {
                dispatch(setInfoAC(true))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtil(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
            })
    }
}

// actions
export const setInfoAC = (newPassword: boolean) => ({type: 'NEW-PASSWORD-SUCCESS', newPassword} as const)

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setInfoAC>

