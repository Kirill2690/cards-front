import {setAppStatusAC} from "../../../../app/app-reducer";
import {authAPI, ForgotDataType} from "../../../../api/api";
import {AppThunk} from "../../../../app/store";
import {errorUtil} from "../../../../common/utils/utils-error";

const initialState = {
    forgotPasswordSuccess: false,
    forgetEmail: null as string | null,
   }


export const recoverPasswordReducer=(state: InitialStateType = initialState, action: ActionsType): InitialStateType =>{
    switch (action.type) {
        case 'FORGOT-PASSWORD-SUCCESS':
            return {...state, forgotPasswordSuccess:action.forgotPasswordSuccess}
        case 'SET-DATA-EMAIL':
            return {
                ...state,
                forgetEmail: action.email
            }
        default:
            return state
    }
};

export const setForgotPasswordSuccessAC = (forgotPasswordSuccess: boolean) => ({type: 'FORGOT-PASSWORD-SUCCESS', forgotPasswordSuccess} as const)
export const setDataForgetPasswordAC = (email: string) => ({type: 'SET-DATA-EMAIL', email} as const)

export const recoverTC = (data: ForgotDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.forgotPassword(data)
        dispatch(setDataForgetPasswordAC(data.email))
        dispatch(setForgotPasswordSuccessAC(true))
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


type InitialStateType=typeof initialState
type ActionsType=ReturnType<typeof setForgotPasswordSuccessAC>|ReturnType<typeof setDataForgetPasswordAC>