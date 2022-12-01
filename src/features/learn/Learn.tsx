import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {useEffect, useState} from "react";
import {CardsType, createLearnCardsTC, setCardsLearnTC} from "../cards/cards-reducer";
import {getCard} from "../../common/utils/getCard";
import {BackToPackList} from "../../common/components/backToPackList/BackToPacksList";
import {Button} from "@mui/material";
import s from './Learn.module.css'

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const Learn = () => {

    const params = useParams();
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards)

    const [value, setValue] = useState<number>(1);
    const [show, setShow] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true);


    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        __v: 0,
        created: '',
        updated: '',
    });


    const showHandler = () => {
        setShow(true)
    }

    const onNextHandler = () => {
        setShow(false)
        setFirst(true)
        if (cards.cards.length > 0) {
            dispatch(createLearnCardsTC({card_id: card._id, grade: value}))
            setCard(getCard(cards.cards));
        }
    }

    useEffect(() => {
        if (first) {
            params.packId && dispatch(setCardsLearnTC(params.packId));
            setFirst(false);
        }
        if (cards.cards.length > 0) setCard(getCard(cards.cards));

    }, [cards]);


    return (
        <div>
            <BackToPackList/>
            <div className={s.learnContainer}>
                <h2 className={s.title}>
                    Learn "{cards.packName}"
                </h2>
                <div className={s.learn}>
                    {cards.cards.length > 0 ?
                        <div>
                            <span className={s.question}>Question: </span> {card.question}
                            <p className={s.numberShots}>Number of answers per question: {card.shots} </p>
                        </div>
                        :
                        <div className={s.error}>
                            <span>There are no cards in this package.</span>
                        </div>
                    }
                    {!show
                        ?
                        <div className={s.buttonContainer}>
                            <Button variant={'contained'} onClick={showHandler}
                                    className={s.button}>Show answer</Button>
                        </div>
                        :
                        <div>
                            <div>
                                <span className={s.question}>Answer:</span>{card.answer}
                            </div>
                            <div className={s.rateBox}>
                                <p>Rate yourself:</p>
                                {grades.map((el, index) => {
                                    const onClickHandler = () => {
                                        setValue(index + 1)
                                    }
                                    return (
                                        <div key={index}>
                                            <div
                                                className={s.inputRadio}
                                                onClick={onClickHandler}
                                                /*onChange={setValue}*/
                                            >
                                                <input
                                                    type={'radio'}
                                                    checked={value === index + 1}
                                                />
                                                <span>{el}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={s.buttonContainer}>
                                <Button variant={'contained'} onClick={onNextHandler} className={s.button}>Next</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
