import React, {useEffect} from 'react';
import s from './App.module.css'
import {Header} from "../features/header/Header";
import {Pages} from "./pages/Pages";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {authMeTC} from "./app-reducer";
import {CircularProgress} from "@mui/material";
import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackBar";


export const App = () => {
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const status=useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC());
    }, []);

    if (!isInitialized) {
        return <div className={s.circular}>
            <CircularProgress color="inherit"/>
        </div>
    }
    return (
        <div className={s.app_wrapper}>
            <Header/>
            <div className={s.app_container}>
                {status === 'loading' && <div className={s.circular}>
                    <CircularProgress color="inherit"/>
                </div>}
                <Pages/>
                <ErrorSnackbar/>

            </div>
        </div>


    );

}