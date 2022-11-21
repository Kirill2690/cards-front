import React from 'react';
import {useNavigate} from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../assets/images/logo_learn.jpeg'
import {Avatar, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {logoutTC} from "../auth/profile/profile-reducer";


export const Header = () => {

    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profile);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const navigate = useNavigate()


    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <header className={s.header_wrapper}>
            <div className={s.header_container}>
                <div className={s.imgBlock}>
                    <img src={logo} alt="logo"/>
                </div>
                {isLoggedIn
                    ?
                    <div className={`${s.wrapper} ${s.dropdown}`}>
                        {profile.name}
                        <Avatar style={{height: '36px', width: '36px', marginLeft: '12px'}}
                                alt="Remy Sharp"
                                src={profile.avatar ? profile.avatar : ''}
                        />
                        <div className={s.button_block}>
                            <Button variant={'contained'}
                                    className={s.button}
                                    onClick={logoutHandler}

                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                    : <div className={s.button_block}>
                        <Button variant={'contained'}
                                className={s.button}
                                onClick={() => navigate('/login')}
                        >
                            Sign in
                        </Button>
                    </div>
                }
            </div>
        </header>
    )
}
