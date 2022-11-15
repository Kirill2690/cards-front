import React, {useCallback} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {changeUserNameTC} from "./profile-reducer";
import logout from "../../../assets/images/logout.svg";
import {Button, FormControl, Input, InputLabel} from "@mui/material";

export const Profile = React.memo(() => {
    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.profile.name)

    const changeUserNameProfile = useCallback(() => {
        dispatch(changeUserNameTC(name))
    }, [])

    const logoutHandler = () => {
        console.log('logOut handler')
        //dispatch(logoutTC())
    }

    return (
        <div className={s.wrapper_profile}>
            <div className={s.profile_Block}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={'https://s5o.ru/storage/simple/ru/edt/21/54/db/fc/rue78b21cd9d1.jpg'} alt={"avatar"}/>
                </div>

                <FormControl variant='standard'>
                    <InputLabel htmlFor="component-simple">Nickname</InputLabel>
                    <Input
                        className={s.input}
                        color={'primary'}
                    />
                </FormControl>
                <Button style={{marginTop: '15px'}} onClick={changeUserNameProfile} variant='contained'
                        size='small'>Save</Button>

                <div className={s.email}>$ivan@gmail.com</div>
                <button className={s.btn} onClick={logoutHandler}><img src={logout} alt={''}/> Log out</button>
            </div>
        </div>
    );
});