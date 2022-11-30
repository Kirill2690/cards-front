import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import s from './Packs.module.css'
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {PacksList} from "../packList/PacksList";
import {addPackTC, getPacksTC, setQueryParamsAC} from "../packs-reducer";
import {Pagination} from "../pagination/Paginator";
import {SearchInput} from "../searchInput/SearchInput";
import {NewSlider} from "../../../common/components/slider/NewSlider";
import {ButtonGroup} from "../ButtonGroup/ButtonGroup";
import {BasicModal} from "../../../common/components/modals/basicModal/BasicModal";
import {AddNewPackModal} from "../../../common/components/modals/packs/AddNewPackModal";

export type ButtonValuesType = "all" | "my";

export const Packs = React.memo(() => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profile._id)
    const userIDParams = useAppSelector(state => state.packs.params.userID)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const minParams = useAppSelector(state => state.packs.params.min)
    const maxParams = useAppSelector(state => state.packs.params.max)
    const packName = useAppSelector(state => state.packs.params.packName)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)

    const [newName, setNewName] = useState<string>('My new pack')
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [buttonValue, setButtonValue] = useState<ButtonValuesType>(userIDParams?"my":"all")
    const [sliderValue, setSliderValue] = useState<number[]>([min, max])
    const [openAddPackModal, setOpenAddPackModal] = useState<boolean>(false)



    useEffect(() => {
        setSliderValue([min, max])
    }, [min, max])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [packName, minParams, maxParams, userIDParams, page, pageCount])

    //Search
    const handleChangeSearch = (text: string | undefined) => {
        dispatch(setQueryParamsAC({packName: text}))
    }
    //Button
    const handleButtonClick = (value: ButtonValuesType) => {
        setButtonValue(value)
        value === "my" ? dispatch(setQueryParamsAC({userID: userId}))
            : dispatch(setQueryParamsAC({userID: undefined}))
    }
    //Slider
    const handleChangeSlider = (newValue: number[]) => {
        setSliderValue(newValue)
        dispatch(setQueryParamsAC({min: newValue[0].toString(), max: newValue[1].toString()}))
    }
    //addNewPack
    const addNewPackHandler = () => {
        setOpenAddPackModal(true)
    }
    //Reset
    const setResetFilterHandler = () => {
        setSearchText(undefined)
        handleButtonClick("all")
        handleChangeSlider([min, max])
    }
    //Pagination
    const pageHandler = (valuePage: number) => {
        dispatch(setQueryParamsAC({page: valuePage.toString()}))
    }
    const pageCountHandler = (valuePageCount: number) => {
        dispatch(setQueryParamsAC({pageCount: valuePageCount.toString()}))
    }

    const handleAddNewPackModal = () => {
        setOpenAddPackModal(false)
    }

    return (
        <div className={s.packs_wrapper}>
            <div className={s.packs_header}>
                <h2>Packs List</h2>
                <div>
                    <BasicModal title={"Add new pack"} openModal={openAddPackModal}
                                closeHandler={handleAddNewPackModal}>
                        <AddNewPackModal closeModal={handleAddNewPackModal}></AddNewPackModal>
                    </BasicModal>
                </div>
                <Button variant={'contained'}
                        className={s.button}
                        onClick={addNewPackHandler}
                >
                    Add new pack
                </Button>
            </div>
            <div className={s.packs_tools}>
                <SearchInput handleChangeSearch={handleChangeSearch} searchText={searchText}
                             setSearchText={setSearchText}/>
                <ButtonGroup buttonValue={buttonValue} changeButton={handleButtonClick}/>
                <NewSlider sliderValue={sliderValue} setSliderValue={setSliderValue}
                           handleChangeSlider={handleChangeSlider}/>
                <Button onClick={setResetFilterHandler}>
                    <FilterListOffIcon/>
                </Button>
            </div>
            <PacksList/>
            <Pagination callBackPage={pageHandler} callBackPageCount={pageCountHandler}/>
        </div>
    )
})
