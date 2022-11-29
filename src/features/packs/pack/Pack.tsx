import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changePackTC, deletePackTC} from "../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import s from '../packs/Packs.module.css'

type PackPropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

export const Pack = React.memo(({userId,
                                    packId,
                                    name,
                                    cardsCount,
                                    updated,
                                    user_name}: PackPropsType) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const profile_Id = useAppSelector(state => state.profile?._id)

    const isMyPacks = userId === profile_Id

    const onDeletePackHandler = () => {
        dispatch(deletePackTC(packId))
    }

    const onChangePackHandler = () => {
        const updatePackData = {_id: packId, name: 'New PackName'}
        dispatch(changePackTC(updatePackData))
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