import React from 'react';
import {TableCell, TableRow} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {changePackTC, deletePackTC} from "./packs-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {NavLink} from "react-router-dom";

type PackPropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

export const Pack = (props: PackPropsType) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)

    const isMyPacks = props.userId === userId

    const onDeletePackHandler = () => {
        dispatch(deletePackTC(props.packId))
    }

    const onChangePackHandler = () => {
        const updatePackData = {_id:props.packId, name:'New PackName'}
        dispatch(changePackTC(updatePackData))
    }

    const onLearnClickHandler = () => {
        alert('Learn Cards!')
    }

    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">
               <NavLink to={`/cards/${props.packId}/${props.name}`}>{props.name}</NavLink>
            </TableCell>
            <TableCell align="left">{props.cardsCount}</TableCell>
            <TableCell align="right">{formatDate(props.updated)}</TableCell>
            <TableCell align="right">{props.user_name}</TableCell>
            <TableCell align="right">
                <SchoolOutlinedIcon onClick={onLearnClickHandler} />

                {isMyPacks && <EditIcon onClick={onChangePackHandler}/>}
                {isMyPacks && <DeleteOutlineIcon onClick={onDeletePackHandler}/>}
            </TableCell>
        </TableRow>
    )
}