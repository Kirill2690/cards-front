import React from "react";
import {useAppDispatch} from "../../../../hooks/hooks";
import {deleteCardsTC} from "../../../../../features/cards/cards-reducer";
import {BasicModal} from "../../basicModal/BasicModal";
import s from './DeleteCardModal.module.css'


type DeleteCardModalPropsType={
    question:string
    closeModal:()=>void
    openModal:boolean
    id:string
    title:string
}

export const DeleteCardModal = ({title,id,openModal,question,closeModal}:DeleteCardModalPropsType) => {

    const dispatch=useAppDispatch()

    const deleteCardHandler = ()=>{
        dispatch(deleteCardsTC(id))
        closeModal()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <p className={s.text}>
                Do you really want to remove <b>{question}</b>?
                <br/>
                All cards will be deleted.
            </p>
            <div className={s.button_wrapper}>
                <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                <button className={s.button_delete} onClick={deleteCardHandler}>Delete</button>
            </div>
        </BasicModal>
    )
}