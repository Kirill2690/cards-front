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
       <div className={s.appBlock}>
           <Header/>
           <ErrorSnackbar/>
           <div className={s.appContainer}>
           <Pages/>
       </div>
       </div>


    );

}