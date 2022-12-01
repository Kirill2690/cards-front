import {Navigate, useNavigate, useSearchParams} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks"
import React, {ChangeEvent, useEffect, useState} from "react";
import {getCardsTC, QueryParamsType, setQueryCardsParamsAC} from "../cards-reducer";
import {useDebounce} from "../../../common/hooks/debounce";
import {filterQueryParams} from "../../../common/utils/filterQueryParams";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CardsPagination} from "../paginatorFromCards/PaginatorCards";
import s from "./TableCards.module.css"
import {Card} from "../card/Card";
import {AddNewCardModal} from "../../../common/components/modals/cards/addNewCardModal/AddNewCardModal";
import {BackToPackList} from "../../../common/components/backToPackList/BackToPacksList";


export const TableCards = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const cards = useAppSelector(state => state.cards.cards)


    const [searchParams, setSearchParams] = useSearchParams()
    const cardsPack_idURL = searchParams.get('cardsPack_id') ? searchParams.get('cardsPack_id') + '' : '1'
    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const cardQuestionURL = searchParams.get('cardQuestion') ? searchParams.get('cardQuestion') + '' : ''

    const userID = useAppSelector((state) => state.profile?._id)
    const userCardID = useAppSelector(state => state.cards.packUserId)
    const pack = useAppSelector(state => state.packs.cardPacks.find(el => el._id === cardsPack_idURL))
    const packName = useAppSelector(state => state.cards.packName)

    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)
    const [paramsSearchState, setParamsSearchState] = useState<QueryParamsType>({
        page: '1',
        pageCount: '5',
        cardsPack_id: cardsPack_idURL
    })
    const [cardQuestion, setCardQuestion] = useState<string>(cardQuestionURL ? cardQuestionURL : '')
    const [openCardModal, setOpenCardModal] = useState(false)

    const debouncedValue = useDebounce<string>(cardQuestion, 500)

    const urlParamsFilter = filterQueryParams({
        cardsPack_id: cardsPack_idURL,
        page: pageURL,
        pageCount: pageCountURL,
        cardQuestion: cardQuestionURL,
    })

    useEffect(() => {
        dispatch(setQueryCardsParamsAC({...urlParamsFilter}))
        dispatch(getCardsTC())
    }, [paramsSearchState, debouncedValue])

    useEffect(() => {
        return setVisibilityValue(false)
    }, [])


    const searchValueTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value)
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                cardQuestion: e.currentTarget.value
            })
        })
    }

    const pageHandler = (valuePage: number) => {
        setParamsSearchState({...paramsSearchState, page: valuePage + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                page: valuePage + '',
                cardQuestion
            })
        })
    }

    const pageCountHandler = (valuePageCount: number) => {
        setParamsSearchState({...paramsSearchState, pageCount: valuePageCount + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                pageCount: valuePageCount + '',
                cardQuestion
            })
        })
    }

    const addNewCardHandler = () => {
        setOpenCardModal(true)
    }

    const handleCardModalClose = () => {
        setOpenCardModal(false)
    }

    const learnCards = () => {
        navigate(`/learn/${pack ? pack._id : cardsPack_idURL}`)
    }


    const isPackAuthor = userCardID === userID

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <AddNewCardModal title={"Add new card"} openModal={openCardModal} id={cardsPack_idURL}
                             closeModal={handleCardModalClose}/>
            <BackToPackList/>
            <div className={s.infoBox}>
                <div className={s.titleMenu}>
                    <h2 className={s.title}>
                        {pack ? pack.name : packName}
                        {isPackAuthor ?
                            <div
                                className={s.iconMenu}>
                            </div>
                            : <div></div>
                        }
                    </h2>
                    {visibilityValue &&
                        <div className={s.cardsMenu}>
                            <div className={s.pointer}></div>
                            <div className={s.menu}>
                                <div className={s.menuEl}>
                                    <span className={s.elTitle}>Edit</span>
                                </div>
                                <div className={s.menuEl}>
                                    <span className={s.elTitle}>Delete</span>
                                </div>
                                <div className={s.menuEl}>
                                    <span className={s.elTitle}>Learn</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {isPackAuthor
                        ?
                        <Button className={s.button} variant='contained' onClick={addNewCardHandler}>Add new
                            cart</Button>
                        :
                        <Button className={s.button} variant='contained' onClick={learnCards}>Learn to pack</Button>
                    }
                </div>
            </div>
            <div className={s.inputBlock}>
                <label className={s.label}>Search</label>
                <input className={s.input}
                       type={"search"}
                       placeholder={'Provide your text'}
                       value={cardQuestion}
                       onChange={searchValueTextHandler}
                />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={{backgroundColor: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell className={s.header}>Question</TableCell>
                            <TableCell className={s.header}>Answer</TableCell>
                            <TableCell className={s.header}>Last Updated</TableCell>
                            <TableCell className={s.header}>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards && cards.map((el) => (
                            <Card
                                key={el._id}
                                card={el}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardsPagination
                callBackPage={pageHandler}
                callBackPageCount={pageCountHandler}
            />
        </div>
    );
}