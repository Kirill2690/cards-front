import React, {useEffect, useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {changeUserInfoTC, logoutTC} from "./profile-reducer";
import {Button, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {Navigate} from "react-router-dom";
import {SuperEditableSpan} from "../../../common/components/superEditableSpan/SuperEditableSpan";
import {BackToPackList} from "../../../common/components/backToPackList/BackToPacksList";
import {InputFile} from "../../../common/components/inputFile/InputFile";

export const Profile = () => {

    const name = useAppSelector(state => state.profile.name)
    const avatar = useAppSelector(state => state.profile.avatar)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const [value, setValue] = useState('')

    const dispatch = useAppDispatch();

    const newUserAvatar = avatar ? avatar : ''

    const changeAvatar = (file64: string) => {
        dispatch(changeUserInfoTC({avatar: file64}))
    };

    const changeUserNameProfile = (value: string) => {
        if (value !== name) {
            dispatch(changeUserInfoTC({name: value, avatar: avatar}))
        }
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        e.key === 'Enter' && changeUserNameProfile(value)
    }

    useEffect(() => {
        if (name) {
            setValue(name)
        }
    }, [name])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }
    return (

        <div className={s.wrapper_profile}>
                <BackToPackList/>
            <div className={s.profile_Block}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={newUserAvatar} alt={"avatar"}/>
                    <label>
                        <InputFile uploadImage={changeAvatar} children={<IconButton component="span">
                            <CameraAltIcon/>
                        </IconButton>}/>
                    </label>
                </div>
                <SuperEditableSpan value={value}
                                   onChangeText={setValue}
                                   spanProps={{children: value ? value : 'enter nickname...'}}
                                   onKeyDown={(e) => onKeyDownHandler(e)}
                />
                <div className={s.email}>{email}</div>
                <Button variant={'contained'}
                        className={s.button}
                        onClick={logoutHandler}
                >
                    <LogoutIcon className={s.logOut}/>
                    Log out
                </Button>
            </div>
        </div>
    );
}
