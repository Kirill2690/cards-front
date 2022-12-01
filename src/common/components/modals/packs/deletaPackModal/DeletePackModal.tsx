import React from 'react';
import {useAppDispatch} from "../../../../hooks/hooks";
import {deletePackTC} from "../../../../../features/packs/packs-reducer";
import {BasicModal} from "../../basicModal/BasicModal";
import s from './DeletePackModal.module.css'

type DeletePackModalPropsType = {
    closeModal: () => void
    packName?: string
    packId: string
    title:string
    openModal:boolean
}
export const DeletePackModal = ({closeModal,packName,packId,title,openModal}: DeletePackModalPropsType) => {

    const dispatch = useAppDispatch()

    const deletePackHandler = () => {
        dispatch(deletePackTC(packId))
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