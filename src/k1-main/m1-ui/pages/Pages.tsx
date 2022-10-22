import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Register} from "../../../k2-features/f1-auth/a1-register/Register";
import {Login} from "../../../k2-features/f1-auth/a0-login/Login";
import {Password} from "../../../k2-features/f1-auth/a4-password/Password";
import {Error404} from "../common/c7-error404/Error404";
import {Recovery} from "../../../k2-features/f1-auth/a3-recovery/Recovery";
import {Test} from "../../../k2-features/f0-test/Test";


export enum Path {
    Login = '/login',
    Register = '/register',
    PageNotFound = 'page-not-found',
    RecoveryPassword = '/recovery-password',
    NewPassword = '/new-password',
    Test = '/test'
}

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={Path.Test}/>}/>
                <Route path={Path.Login} element={<Login/>}/>
                <Route path={Path.Register} element={<Register/>}/>
                <Route path={Path.PageNotFound} element={<Error404/>}/>
                <Route path={Path.RecoveryPassword} element={<Recovery/>}/>
                <Route path={Path.NewPassword} element={<Password/>}/>
                <Route path={Path.Test} element={<Test/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};