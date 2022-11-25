import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {
    addCardTC,
    getCardsTC,
    searchAnswerAC,
    searchQuestionAC,
    setCardsPageAC,
    setCardsPageCountAC
} from "./cards-reducer";
import {CardsTable} from "./CardTable";
import React from "react";
import {useDebounce} from "../../common/hooks/debounce";
import {Button, TablePagination} from "@mui/material";
import s from './Cards.module.css';


export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const cardsTotalCount = useAppSelector(state => state.cards.params.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const card = useAppSelector(state => state.cards.cards)
    const pack = useAppSelector(state => state.packs.cardPacks)
   /* const params = useParams()
    const packID = params.packId
*/
    const {packId, packName} = useParams<'packId' | 'packName'>();

    const [searchCardValue, setSearchCardValue] = React.useState('Question');

    const handleChangeSearchCardValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (searchCardValue === 'Question') {
            dispatch(searchQuestionAC(e.currentTarget.value))
        } else {
            dispatch(searchAnswerAC(e.currentTarget.value))
        }
    };

    const clearValue = (value: string) => {
        if (searchCardValue === 'Question') dispatch(searchQuestionAC(''))
        else dispatch(searchAnswerAC(''))
        setSearchCardValue(value)
    }

    const debouncedValue = useDebounce((searchCardValue === 'Question') ? cardQuestion : cardAnswer, 1000)

    const addNewCardHandler = () => {
        const newCard = {
            cardsPack_id: packId,
            question: 'This should be a question',
            answer: 'This should be the answer',
            grade: 0
        }
       packId && dispatch(addCardTC(newCard))
    }
    const learnPackHandler = () => {
        alert('Learn Pack!')
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setCardsPageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCardsPageCountAC(Number(event.target.value)))
        dispatch(setCardsPageAC(1))
    };

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
        }
    }, [dispatch, packId, page, pageCount, debouncedValue]);

    const returnToPacks = () => {
        dispatch(searchQuestionAC(''))
        dispatch(searchAnswerAC(''))
        navigate('/packs')
    }
    const isMyPacks = userId === packUserId
    return (
        <div>
            <div className={s.tableWrapper}>
                <div className={s.container}>
                    <Button><NavLink to={'/packs' }>🠔 Back to Packs List</NavLink></Button>
                    <div>
                        {isMyPacks
                            ? <Button variant='contained' onClick={addNewCardHandler}>Add new cart</Button>
                            : <Button variant='contained' onClick={learnPackHandler}>Learn to pack</Button>
                        }
                    </div>
                    {/*    <SearchAppBar radioValue={searchCardValue}
                                  onChangeRadio={clearValue}
                                  disabled={packUserId !== userId}
                                  title={'Add new card'}
                                  goBack={returnToPacks}
                                  value={searchCardValue === 'Question' ? cardQuestion : cardAnswer}
                                  onChange={handleChangeSearchCardValue}
                    />*/}
                    <h1 className={s.title}>{packName}</h1>
                    <CardsTable/>
                    <div className={s.paginatorBlock}>
                        <TablePagination
                            count={cardsTotalCount}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageCount}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}