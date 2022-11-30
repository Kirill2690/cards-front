import React from "react";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../hooks/hooks";
import {deleteCardsTC} from "../../../../features/cards/cards-reducer";


type DeleteCardModalPropsType={
    question:string
    closeModal:()=>void
    id:string
}

export const DeleteCardModal = (props:DeleteCardModalPropsType) => {

    const dispatch=useAppDispatch()

    const deleteCardHandler = ()=>{
        dispatch(deleteCardsTC(props.id))
    }

    return (
        <>
            <div>`Do you really want to remove {props.question}? All cards will be deleted.`</div>
            <Button variant='outlined' onClick={props.closeModal}>Cancel</Button>
            <Button variant='contained' onClick={deleteCardHandler}>Delete</Button>
        </>
    )
}