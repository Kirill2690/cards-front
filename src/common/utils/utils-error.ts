import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../../app/app-reducer";

export const errorUtil= (e: any, dispatch: Dispatch) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}