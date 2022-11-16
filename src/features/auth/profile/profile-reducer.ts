import {authAPI, UserType} from "../../../api/api";
import {AppDispatch, AppThunk} from "../../../app/store";
import {errorUtil} from "../../../common/utils/utils-error";
import {setAppStatusAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";


const initialState = {
    name: ''
}

type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-USER-NAME":
            return {...state, name: action.newText}
        default:
            return state
    }
}

const updateUserNameAC = (newText: string) => ({type: 'CHANGE-USER-NAME', newText} as const)
export type ProfileActionType = ReturnType<typeof updateUserNameAC>

export const changeUserNameTC = (name: string): AppThunk => (dispatch: AppDispatch) => {
    authAPI.changeUserName(name)
        .then(() => {
            console.log('change name')
            dispatch(updateUserNameAC(name))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtil(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}


