import {Link, useParams} from "react-router-dom";
import s from './CheckEmail.module.css'
import email_logo from '../../../../assets/images/email_icon.png'

export const CheckEmail = () => {

    const {email} = useParams()

    return (
        <div className={s.wrapper_email}>
            <div className={s.form}>
                <img src={email_logo} alt={'Email img'}/>
                <div className={s.title}>Check Email</div>
                We've sent an Email with instructions to <b>{email}</b>
                <div className={s.login}>
                    <Link to={'/login'}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};