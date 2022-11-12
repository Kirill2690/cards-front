import React from 'react';
import s from './App.module.css'
import {Header} from "../features/header/Header";
import {Pages} from "./pages/Pages";

export const App = () => (
    <div className={s.app_wrapper}>
        <Header/>
        <Pages/>
    </div>
);

