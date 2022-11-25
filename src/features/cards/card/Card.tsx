import React from "react";
import {TableCell, TableRow} from "@mui/material";
import s from "./Card.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../../common/hooks/hooks";
import {Stars} from "../../../common/components/stars/Stars";
import {CardsType} from "../cards-reducer";

export type CardPropsType = {
    card: CardsType
}


export const Card = ({card}: CardPropsType) => {

    const userID = useAppSelector((state) => state.profile?._id)

    const isPersonPack = card.user_id === userID
    const finalQuestionColumn = isPersonPack ? s.questionColumn : s.questionColumnSecond
    const finalAnswerColumn = isPersonPack ? s.answerColumn : s.answerColumnSecond
    const finalGradeColumn = isPersonPack ? s.gradeColumn : s.gradeColumnSecond



    return (
<>
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
                            <DeleteOutlineIcon/>
                            <div className={s.icon}>
                                <EditIcon/>
                            </div>
                        </div>
                    }
                </div>
            </TableCell>
        </TableRow>
</>
)
}