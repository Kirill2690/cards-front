import React from 'react';
import {useNavigate} from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../assets/images/logo_learn.jpeg'
import {Button} from "@mui/material";


export const Header = () => {

    const navigate = useNavigate()

    return (
        <header className={s.header_wrapper}>
            <div className={s.container}>
                <div className={s.imgBlock}>
                    <img src={logo} alt="logo"/>
                </div>
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
