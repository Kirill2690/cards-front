import {AppThunk} from "../../../app/store";
import {authAPI, RegisterDataType} from "../../../api/api";
import {setAppStatusAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";
import {errorUtil} from "../../../common/utils/utils-error";

const initialState = {
    isRegistered: false
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REG/SIGN-UP':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// thunks
export const registerTC = (data: RegisterDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.authRegister(data)
            .then(() => {
                dispatch(registerAC(true))
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
export const registerAC = (isRegistered: boolean) => ({type: 'REG/SIGN-UP', isRegistered} as const)

// types
type ActionsType = ReturnType<typeof registerAC>
type InitialStateType = typeof initialState