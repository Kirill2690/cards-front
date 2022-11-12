import React from 'react';
import s from './Error404.module.css'
import error404 from  '../../../assets/images/error_404.png'

export const Error404 = () => {
    return (
        <div className={s.wrapper_error}>
            <img className={s.img_error} src={error404} alt={'error'}/>

        </div>
    );
};