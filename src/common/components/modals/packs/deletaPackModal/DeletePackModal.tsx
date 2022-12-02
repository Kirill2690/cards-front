import React from 'react';
import {useAppDispatch} from "../../../../hooks/hooks";
import {deletePackTC} from "../../../../../features/packs/packs-reducer";
import {BasicModal} from "../../basicModal/BasicModal";
import s from './DeletePackModal.module.css'
import {useNavigate} from "react-router-dom";

type DeletePackModalPropsType = {
    closeModal: () => void
    packName?: string
    packId: string
    title: string
    openModal: boolean
    cardsPack_id:string
}
export const DeletePackModal = ({cardsPack_id,closeModal, packName, packId, title, openModal}: DeletePackModalPropsType) => {

    const dispatch = useAppDispatch()
    const navigate=useNavigate()

    const deletePackHandler = () => {
        dispatch(deletePackTC(cardsPack_id))
        closeModal()
        navigate('/packs')
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <p className={s.text}>
                Do you really want to remove <b>{packName}?</b>?
                <br/>
                All packs will be deleted.
            </p>
            <div className={s.button_wrapper}>
                <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                <button className={s.button_delete} onClick={deletePackHandler}>Delete</button>
            </div>
        </BasicModal>
    )
}