import React, {useEffect, useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {changeUserNameTC, logoutTC} from "./profile-reducer";
import {Button} from "@mui/material";
import {Navigate} from "react-router-dom";
import {SuperEditableSpan} from "../../../common/components/superEditableSpan/SuperEditableSpan";

export const Profile = React.memo(() => {
    const name = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const [value, setValue] = useState(name)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name) {
            setValue(name)
        }
    }, [name])

    const changeUserNameProfile = (value: string) => {
        dispatch(changeUserNameTC(value))
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        e.key === 'Enter' && changeUserNameProfile(value)
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }
    return (
        <div className={s.wrapper_profile}>
            <div className={s.profile_Block}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={'https://s5o.ru/storage/simple/ru/edt/21/54/db/fc/rue78b21cd9d1.jpg'} alt={"avatar"}/>
                </div>

                <SuperEditableSpan value={value}
                                   onChangeText={setValue}
                                   spanProps={{children: value ? value : 'enter nickname...'}}
                                   onKeyDown={(e) => onKeyDownHandler(e)}
                />

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