import React from "react";
import {Button, Rating, TableCell, TableRow} from "@mui/material";
import s from "./Cards.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

type CardPropsType = {
    userId: string
    cardId: string
    question: string
    answer: string
    updated: string
    grade: number
}


export const Card = (props: CardPropsType) => {

    //const isMyPacks = props.userId === userId

    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {props.question}
            </TableCell>
            <TableCell align="center">{props.answer}</TableCell>
            <TableCell align="center"><Rating name="read-only" value={props.grade} readOnly/>
            </TableCell>
            <TableCell align="center">{formatDate(props.updated)}</TableCell>
            <TableCell className={s.buttonBlock}>
         {/*   {isMyPacks && <DeleteOutlineIcon/>}

                   {isMyPacks && <EditIcon/>}*/}

            </TableCell>
        </TableRow>
    )
}