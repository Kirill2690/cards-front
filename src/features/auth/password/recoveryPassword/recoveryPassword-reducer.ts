import {setAppStatusAC} from "../../../../app/app-reducer";
import {authAPI, ForgotDataType} from "../../../../api/api";
import {AppThunk} from "../../../../app/store";
import {errorUtil} from "../../../../common/utils/utils-error";

const initialState = {
    forgotPasswordSuccess: false
   }


export const recoverPasswordReducer=(state: InitialStateType = initialState, action: ActionsType): InitialStateType =>{
    switch (action.type) {
        case 'FORGOT-PASSWORD-SUCCESS':
            return {...state, forgotPasswordSuccess:action.forgotPasswordSuccess};
        default:
            return state
    }
};

export const setForgotPasswordSuccessAC = (forgotPasswordSuccess: boolean) => ({type: 'FORGOT-PASSWORD-SUCCESS', forgotPasswordSuccess} as const)

export const recoverTC = (forgotData: ForgotDataType): AppThunk => async dispatch=> {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.forgotPassword(forgotData)
        dispatch(setForgotPasswordSuccessAC(true))
    } catch (e) {
        errorUtil(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


type InitialStateType=typeof initialState
type ActionsType=ReturnType<typeof setForgotPasswordSuccessAC>