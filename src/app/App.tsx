import React, {useEffect} from 'react';
import s from './App.module.css'
import {Header} from "../common/components/header/Header";
import {RoutesPages} from "./pages/Routes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {authMeTC} from "./app-reducer";
import {ErrorSnackbar} from "../common/components/errorSnackBar/ErrorSnackBar";
import {Preloader} from "../common/components/preloader/Preloader";

export const App = () => {
//
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC());
    }, []);


    if (!isInitialized) {
        return <Preloader/>
    }
    return (
        <div className={s.app_wrapper}>
            <Header/>
            <div className={s.app_container}>
                <RoutesPages/>
                <ErrorSnackbar/>
            </div>
        </div>
    );

}