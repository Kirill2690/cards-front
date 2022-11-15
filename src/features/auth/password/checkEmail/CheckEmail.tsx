import { useNavigate, useParams} from "react-router-dom";
import s from './CheckEmail.module.css'
import email_logo from '../../../../assets/images/email_icon.png'
import {Button} from "@mui/material";

export const CheckEmail = () => {

    const {email} = useParams()
    const navigate=useNavigate()

    return (
            <div className={s.form}>
                <div className={s.title}><b>Check Email</b></div>
                <div className={s.img_block}>
                    <img src={email_logo} alt={'Email img'}/>
                </div>
                We've sent an Email with instructions to <b>{email}</b>
                <div className={s.button_block}>
                    <Button onClick={()=>{navigate('/login')}} className={s.button} variant={'contained'} type="submit">Back to login</Button>
                </div>
                </div>

    );
};