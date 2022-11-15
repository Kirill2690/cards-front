import React, {useState} from 'react';
import s from './Error404.module.css'
import {Navigate} from "react-router-dom";
import pageNotFound from "../../../assets/images/—Pngtree—404 error with a broken_7222901.png"
import {Button} from "@mui/material";

export const Error404 = () => {
    const [error, setError] = useState<boolean>(false)

    const onClickHandler = () => {
        setError(true)
    }

    if (error) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.error404}>

            <div>
                <img className={s.img_error} src={pageNotFound} alt={'error'}/>
            </div>
            <div className={s.error_btn}>
                <Button onClick={onClickHandler} style={{color:'#F9F9FA'}}>↩ Back to homepage</Button>
            </div>
        </div>
    );
};