import React from 'react';
import s from './App.module.css'
import {Header} from "../features/header/Header";
import {Pages} from "./pages/Pages";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {LinearProgress} from "@mui/material";

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    /*if (!isInitialized) {
        return <div className={s.progress}>
            <LinearProgress color="secondary"/>
        </div>
    }*/
    return(
        <div className={s.app_wrapper}>
            <Header/>
            <Pages/>
        </div>
        )

}




