import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

export const errorUtil = (e: Error | AxiosError<{error: string}> | unknown, dispatch:Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppStatusAC('failed'))
}