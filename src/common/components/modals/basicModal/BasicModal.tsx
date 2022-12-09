import {Box, IconButton, Modal, Typography} from "@mui/material";
import {ReactNode} from "react";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import s from './BasicModal.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #366EFF',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
};

type BasicModalPropsType = {
    title: string
    openModal: boolean
    children: ReactNode
    closeHandler: () => void
}

export const BasicModal = React.memo((
    {
        openModal, title, closeHandler,
        children
    }:BasicModalPropsType) => {

    return (
        <>
            <Modal open={openModal} onClose={closeHandler} sx={{zIndex: 1}}>
                <div>
                    <Box sx={style}>
                        <div className={s.titleModals}>
                            <Typography>{title}</Typography>
                            <IconButton onClick={closeHandler}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Box>{children}</Box>
                    </Box>
                </div>
            </Modal>
        </>
    );
})