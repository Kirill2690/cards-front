import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Register} from "../../features/auth/register/Register";
import {Login} from "../../features/auth/login/Login";
import {NewPassword} from "../../features/auth/password/newPassword/NewPassword";
import {Error404} from "../../common/components/error404/Error404";
import {RecoveryPassword} from "../../features/auth/password/recoveryPassword/RecoveryPassword";
import {CheckEmail} from "../../features/auth/password/checkEmail/CheckEmail";
import {Profile} from "../../features/auth/profile/Profile";
import {useAppSelector} from "../../common/hooks/hooks";
import {CircularProgress} from "@mui/material";
import {AppRootStateType} from "../store";
import s from "../App.module.css";
import {Preloader} from "../../common/components/preloader/Preloader";
import {Packs} from "../../features/packs/Packs";
import {NewPack} from "../../features/packs/NewPack";
import {Cards} from "../../features/cards/Cards";


export enum Path {
    Login = '/login',
    Register = '/register',
    Error404 = '/error404',
    RecoveryPassword = '/recovery-password',
    CheckEmail = '/checkEmail',
    NewPassword = '/set-new-password',
    Profile = '/profile',
    Packs='/packs',
    NewPack='/new-pack'

}

export const RoutesPages = () => {
    const navigate = useNavigate()
    const isLogged = useAppSelector((state: AppRootStateType) => state.login)
    const status = useAppSelector(state => state.app.status)

   /* useEffect(() => {
        if (!isLogged) {
            navigate('/login')
        }
    }, [])*/

    return (
        <div>
            {status === 'loading' && <Preloader/>}
            <Routes>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'/checkEmail'} element={<CheckEmail/>}/>
                <Route path={'/set-new-password/:token'} element={<NewPassword/>}/>
                <Route path={'/packs'} element={<Packs/>}/>
                <Route path={'/cards/:packId/:packName'} element={<Cards/>}/>
                {/*<Route path={'/new-pack'} element={<NewPack/>}/>*/}
                <Route path={'/error404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
            </Routes>
        </div>
    );
};