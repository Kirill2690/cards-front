import React, {useState} from "react";
import {TableCell, TableRow} from "@mui/material";
import s from "./Card.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../../common/hooks/hooks";
import {Stars} from "../../../common/components/stars/Stars";
import {CardsType} from "../cards-reducer";
import {BasicModal} from "../../../common/components/modals/basicModal/BasicModal";
import {DeleteCardModal} from "../../../common/components/modals/cards/deleteCardModal/DeleteCardModal";
import {EditCardModal} from "../../../common/components/modals/cards/editCardModal/EditCardModal";

export type CardPropsType = {
    card: CardsType

}


export const Card = ({card}: CardPropsType) => {

    const userID = useAppSelector((state) => state.profile?._id)

    const isPersonPack = card.user_id === userID
    const finalQuestionColumn = isPersonPack ? s.questionColumn : s.questionColumnSecond
    const finalAnswerColumn = isPersonPack ? s.answerColumn : s.answerColumnSecond
    const finalGradeColumn = isPersonPack ? s.gradeColumn : s.gradeColumnSecond

    const [openCardModal, setOpenCardModal] = useState(false)
    const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false)

    const onDeleteCardHandler = () => {
        setOpenDeleteCardModal(true)
    }
    const onChangeCardHandler = () => {
        setOpenCardModal(true)
    }
    const handleCardModalClose = () => {
        setOpenCardModal(false)
    }
    return (
        <>
            <DeleteCardModal title={"Delete card"} openModal={openDeleteCardModal} question={card.question}
                             closeModal={handleCardModalClose} id={card._id}/>

            <EditCardModal title={"Edit card"} openModal={openCardModal} answer={card.answer} question={card.question}
                           cardId={card._id}
                           closeModal={handleCardModalClose}/>

            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell className={finalQuestionColumn} component="th" scope="row">
                    {card.question}
                </TableCell>
                <TableCell className={finalAnswerColumn}>
                    {card.answer}
                </TableCell>
                <TableCell className={s.dateColumn}>
                    {card.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}
                </TableCell>
                <TableCell className={finalGradeColumn}>
                    <div className={s.gradeBox}>
                        <Stars ratingValue={card.grade}/>
                        {isPersonPack &&
                            <div className={s.icons}>
                                <DeleteOutlineIcon onClick={onDeleteCardHandler}/>
                                <div className={s.icon}>
                                    <EditIcon onClick={onChangeCardHandler}/>
                                </div>
                            </div>
                        }
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}