import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {Path} from "../../app/pages/Pages";

export const Header = () => {

    const activeClass = (props: { isActive: boolean }) => props.isActive ? s.active : s.link

    return (
        <div className={s.container}>
            <NavLink to={Path.Login} className={activeClass}>Login</NavLink>
            <NavLink to={Path.Register} className={activeClass}>Registration</NavLink>
            <NavLink to={Path.Error404} className={activeClass}>Error404</NavLink>
            <NavLink to={Path.RecoveryPassword} className={activeClass}>Password recovery</NavLink>
            <NavLink to={Path.NewPassword} className={activeClass}>New password</NavLink>
            <NavLink to={Path.CheckEmail} className={activeClass}>CheckEmail</NavLink>
            <NavLink to={Path.Profile} className={activeClass}>Profile</NavLink>
        </div>
    );
};