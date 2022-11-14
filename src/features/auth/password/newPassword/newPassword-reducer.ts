import {setAppStatusAC} from "../../../../app/app-reducer";
import {AxiosError} from "axios";
import {errorUtil} from "../../../../common/utils/utils-error";
import {AppThunk} from "../../../../app/store";
import {authAPI, SetNewPasswordType} from "../../../../api/api";


const initialState: InitialStateType = {
    info: '',
    isPassChanged: false
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'NEW-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'IS-PASS-CHANGED':
            return {...state, isPassChanged: action.isPassChanged}
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
                dispatch(setInfoAC(res.data.info))
                dispatch(setPassChangedAC(true))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtil(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// actions
export const setInfoAC = (info: string) => ({type: 'NEW-PASSWORD-SUCCESS', info} as const)
export const setPassChangedAC = (isPassChanged: boolean) => ({type: 'IS-PASS-CHANGED', isPassChanged} as const)

// types
type InitialStateType = {
    info: string
    isPassChanged: boolean
}

type ActionsType = ReturnType<typeof setInfoAC> | ReturnType<typeof setPassChangedAC>