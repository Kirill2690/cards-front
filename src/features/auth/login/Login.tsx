import React from 'react';
import s from './Login.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";


export const Login = () => {

    return (
        <div className={s.login}>
            Enter you login
        </div>
    );
};