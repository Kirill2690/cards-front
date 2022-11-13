import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../assets/images/logo_learn.jpeg'
import {Button} from "@mui/material";


export const Header = () => {

    const navigate = useNavigate()

    return (
        <header>
            <div className={s.container}>
                <NavLink to={'/login'}>
                    <div className={s.imgBlock}>
                        <img src={logo} alt="logo"/>
                    </div>
                </NavLink>
                <div className={s.button_block}>
                    <Button variant={'contained'}
                            className={s.button}
                            onClick={() => navigate('/login')}
                    >
                        Sign in
                    </Button>
                </div>


            </div>

        </header>
    )
}
