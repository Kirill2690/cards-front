import {AppDispatch} from "../../../app/store";
import {authAPI, LoginDataType} from "../../../api/api";
import {setAppStatusAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";

type AuthLoginACType = ReturnType<typeof authLoginAC>
type ActionType = AuthLoginACType
type StateType = {isLoggedIn: boolean}

const initialState = {
    isLoggedIn: false
}

export const loginReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            return {
                ...state, isLoggedIn: action.isLoggedIn,
            }
        default:
            return state
    }
}

export const authLoginAC = (isLoggedIn: boolean) => {
    return {type: "IS_LOGGED_IN", isLoggedIn} as const
}
export const loginTC = (values: LoginDataType) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(values).then((response) => {
            dispatch(authLoginAC(true))

            dispatch(setProfileAC(response.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((e: AxiosError<{ error: string }>) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('error: ', error)
        })
    }
}