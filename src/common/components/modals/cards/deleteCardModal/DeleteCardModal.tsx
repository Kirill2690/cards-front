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

export const DeleteCardModal =React.memo (({title,id,openModal,question,closeModal}:DeleteCardModalPropsType) => {

    const dispatch=useAppDispatch()

    const deleteCardHandler = ()=>{
        dispatch(deleteCardsTC(id))

    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <div>
                <p>Do you really want to remove card with question?</p>
                {question.slice(0, 10) === 'data:image'
                    ? <img src={question} alt={'question img'} style={{width: '100px'}}/>
                    : <b>{question}</b>}
                <p>This card will be deleted.</p>
            </div>
            <div className={s.button_wrapper}>
                <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                <button className={s.button_delete} onClick={deleteCardHandler}>Delete</button>
            </div>
        </BasicModal>
    )
})