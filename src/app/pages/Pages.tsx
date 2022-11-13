import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Register} from "../../features/auth/register/Register";
import {Login} from "../../features/auth/login/Login";
import {NewPassword} from "../../features/auth/password/newPassword/NewPassword";
import {Error404} from "../../common/components/error404/Error404";
import {RecoveryPassword} from "../../features/auth/password/recoveryPassword/RecoveryPassword";
import {CheckEmail} from "../../features/auth/password/checkEmail/CheckEmail";
import {Profile} from "../../features/auth/profile/Profile";


export enum Path {
    Login = '/login',
    Register = '/register',
    Error404 = '/error404',
    RecoveryPassword = '/recovery-password',
    CheckEmail='/checkEmail',
    NewPassword = '/new-password',
    Profile='/profile'

}

export const Pages = () => {
    return (
        <div >
            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'/checkEmail'} element={<CheckEmail/>}/>
                <Route path={'/new-password/:token'} element={<NewPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/error404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
            </Routes>
        </div>
    );
};