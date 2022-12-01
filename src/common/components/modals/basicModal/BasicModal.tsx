import {Modal} from "@mui/material";
import {ReactNode} from "react";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import s from './BasicModal.module.css'

type BasicModalPropsType = {
    title: string
    openModal: boolean
    children: ReactNode
    closeHandler: () => void
}

export const BasicModal: React.FC<BasicModalPropsType> = (
    {
        openModal, title, closeHandler,
        children
    }) => {

    return (
        <>
            <Modal open={openModal} onClose={closeHandler} sx={{zIndex: 1}}>
                <div className={s.main}>
                    <div className={s.titleBox}>
                        <h3>{title}</h3>
                        <ClearIcon sx={{
                            cursor: 'pointer', width: '14px',
                            height: '14px'
                        }} onClick={closeHandler}/>
                    </div>
                    {children}
                </div>
            </Modal>
        </>
    );
}