import React, {useCallback, useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {changeUserNameTC, logoutTC} from "./profile-reducer";
import logout from "../../../assets/images/logout.svg";
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import {Navigate} from "react-router-dom";
import {Span} from "./Span";
import ava from '../../../assets/images/ava.png'

export const Profile = React.memo(() => {
    const name = useAppSelector(state => state.profile.name)
    const email=useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch();

    const changeUserNameProfile = useCallback(() => {
        dispatch(changeUserNameTC(name))
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className={s.wrapper_profile}>
            <div className={s.profile_Block}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={ava} alt={"avatar"}/>
                </div>
                <FormControl variant='standard'>
                  {/*  <InputLabel htmlFor="component-simple">Nickname</InputLabel>*/}
                    <Span value={name} onChange={changeUserNameProfile}/>
                </FormControl>
                {/*<Button style={{marginTop: '15px'}} onClick={changeUserNameProfile} variant='contained'
                        size='small'>Save</Button>*/}
                <div className={s.email}>{email}</div>
                <div className={s.button_block}>
                    <Button variant={'contained'}
                            className={s.button}
                            onClick={logoutHandler}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    );
});