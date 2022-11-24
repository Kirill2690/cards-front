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
        case 'REC/FORGOT-PASSWORD-SUCCESS':
            return {...state, forgotPasswordSuccess:action.forgotPasswordSuccess}
        case 'REC/SET-DATA-EMAIL':
            return {
                ...state,
                forgetEmail: action.email
            }
        default:
            return state
    }
};

//actions
export const setForgotPasswordSuccessAC = (forgotPasswordSuccess: boolean) => ({type: 'REC/FORGOT-PASSWORD-SUCCESS', forgotPasswordSuccess} as const)
export const setDataForgetPasswordAC = (email: string) => ({type: 'REC/SET-DATA-EMAIL', email} as const)

//thunks
export const recoverTC = (data: ForgotDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.forgotPassword(data)
        dispatch(setDataForgetPasswordAC(data.email))
        dispatch(setForgotPasswordSuccessAC(true))
    } catch (e) {
        errorUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

//types
type InitialStateType=typeof initialState
type ActionsType=ReturnType<typeof setForgotPasswordSuccessAC>|ReturnType<typeof setDataForgetPasswordAC>