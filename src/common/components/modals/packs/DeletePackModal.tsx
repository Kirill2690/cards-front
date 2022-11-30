import React from 'react';
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../hooks/hooks";
import {deletePackTC} from "../../../../features/packs/packs-reducer";

type DeletePackModalPropsType = {
    closeModal: () => void
    packName?: string
    packId: string
}
export const DeletePackModal = (props: DeletePackModalPropsType) => {

    const dispatch = useAppDispatch()

    const deletePackHandler = () => {
        dispatch(deletePackTC(props.packId))
    }

    return (
        <>
            <div>`Do you really want to remove {props.packName}? All cards will be deleted.`</div>
            <Button variant='outlined' onClick={props.closeModal}>Cancel</Button>
            <Button variant='contained' onClick={deletePackHandler}>Save</Button>
        </>
    )
}