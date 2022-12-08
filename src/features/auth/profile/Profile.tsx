import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {changeUserInfoTC, logoutTC} from "./profile-reducer";
import {Button, IconButton} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {Navigate, NavLink} from "react-router-dom";
import {SuperEditableSpan} from "../../../common/components/superEditableSpan/SuperEditableSpan";
import {convertFileToBase64} from "../../../common/utils/convertFileToBase64";

export const Profile = () => {
    const name = useAppSelector(state => state.profile.name)
    const avatar = useAppSelector(state => state.profile.avatar)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const [value, setValue] = useState('')

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (name) {
            setValue(name)
        }
    }, [name])

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 40000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeUserInfoTC({avatar: file64}));
                });
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const newUserAvatar = avatar ? avatar : ''

    const changeUserNameProfile = (value: string) => {
        if (value !== name) {
            dispatch(changeUserInfoTC({name: value, avatar: avatar}))
        }
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
            <NavLink to={'/packs'}>🠔 Back to Packs List</NavLink>
            <div className={s.profile_Block}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={newUserAvatar} alt={"avatar"}/>
                    <label>
                        <input type="file"
                               onChange={uploadHandler}
                               style={{display: 'none'}}
                        />
                        <IconButton component="span">
                            <CameraAltIcon/>
                        </IconButton>
                    </label>
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
}
