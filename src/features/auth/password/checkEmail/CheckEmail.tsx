import { useNavigate} from "react-router-dom";
import s from './CheckEmail.module.css'
import email_logo from '../../../../assets/images/email_icon.png'
import {Button} from "@mui/material";
import {useAppSelector} from "../../../../common/hooks/hooks";
import React from "react";

export const CheckEmail = () => {

    const email = useAppSelector(state => state.recoverPassword.forgetEmail)
    const navigate=useNavigate()

    return (
            <div className={s.form}>
                <div className={s.title}><b>Check Email</b></div>
                <div className={s.img_block}>
                    <img src={email_logo} alt={'Email img'}/>
                </div>
                We've sent an Email with instructions to <b>{email}</b>
                <Button onClick={()=>navigate('/login')} className={s.button} type="submit" variant="contained">
                    Back to login
                </Button>
                </div>

    );
};