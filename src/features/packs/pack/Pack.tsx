import React, {useState} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changePackTC} from "../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {BasicModal} from "../../../common/components/modals/basicModal/BasicModal";
import {DeletePackModal} from "../../../common/components/modals/packs/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/packs/EditPackModal";

type PackPropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

export const Pack = React.memo(({
                                    userId,
                                    packId,
                                    name,
                                    cardsCount,
                                    updated,
                                    user_name
                                }: PackPropsType) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const profile_Id = useAppSelector(state => state.profile?._id)
    const [openDeletePack, setOpenDeletePack] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const isMyPacks = userId === profile_Id
    const handleEditModalClose = () => {
        setOpenEditModal(false)
    };

    const handlerDeletePackClose = () => {
        setOpenDeletePack(false)
    }

    const onDeletePackHandler = () => {
        setOpenDeletePack(true)
        /*  dispatch(deletePackTC(packId))*/
    }

    const onChangePackHandler = () => {
        setOpenEditModal(true)
    }

    const onLearnClickHandler = () => {
        alert('Learn Cards!')
    }

    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    return (

        <>
            <TableRow key={packId} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <BasicModal title='Delete pack' openModal={openDeletePack} closeHandler={handlerDeletePackClose}>
                    <DeletePackModal packId={packId} closeModal={handlerDeletePackClose} packName={name}/>
                </BasicModal>
                <BasicModal title='Edit pack' openModal={openEditModal} closeHandler={handleEditModalClose}>
                    <EditPackModal packId={packId} closeModal={handleEditModalClose} packName={name}/>
                </BasicModal>
                <TableCell align="left">
                    <NavLink to={`/cards?cardsPack_id=${packId}&page=1&pageCount=5`}>{name}</NavLink>
                </TableCell>
                <TableCell align="left">{cardsCount}</TableCell>
                <TableCell align="right">{formatDate(updated)}</TableCell>
                <TableCell align="right">{user_name}</TableCell>
                <TableCell align="right">
                    <SchoolOutlinedIcon onClick={onLearnClickHandler}/>
                    {isMyPacks && <EditIcon onClick={onChangePackHandler}/>}
                    {isMyPacks && <DeleteOutlineIcon onClick={onDeletePackHandler}/>}
                </TableCell>
            </TableRow>
        </>
    )
})