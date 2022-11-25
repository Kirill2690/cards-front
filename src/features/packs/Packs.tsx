import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {PacksList} from "../PacksList";
import {addPackTC, getPacksTC, QueryParamsType, setQueryParamsAC} from "./packs-reducer";
import {Search} from "../../common/components/search/Search";
import {NewSlider} from "../../common/components/slider/NewSlider";
import {useSearchParams} from "react-router-dom";
import {filterQueryParams} from "../../common/utils/filterQueryParams";
import {ButtonGroup} from "../../common/components/buttonGroup/ButtonGroup";

export type ButtonValuesType = "all" | "my" ;


export const Packs = React.memo(() => {

    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
    const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
    const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
    const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''


    //Search
    const packName = useAppSelector(state => state.packs.params.packName)

    const [searchText, setSearchText] = React.useState<string>("");

    const handleChangeSearch = useCallback((text: string) => {
        dispatch(setQueryParamsAC({packName: text}))
    },[dispatch])

    //Slider
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const minParams = useAppSelector(state => state.packs.params.min)
    const maxParams = useAppSelector(state => state.packs.params.max)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleChangeSlider = (newValue: number[]) => {
        setValue(newValue)
        dispatch(setQueryParamsAC({min:newValue[0].toString(),max:newValue[1].toString()}))
    }

    //ButtonGroup
    const userId = useAppSelector(state => state.profile._id)
    const userIDParams = useAppSelector(state => state.packs.params.userID)

    const [buttonValue, setButtonValue] = React.useState<ButtonValuesType>("all");

    const handleButtonClick =(value:ButtonValuesType) => {
        setButtonValue(value)
        value==="my" ? dispatch(setQueryParamsAC({userID: userId}))
            : dispatch(setQueryParamsAC({userID: ""}))
    }

    const setResetFilterHandler = () => {
        setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: '',sortPacks:''})
        setSearchParams({page: '1', pageCount: '5'})
        setSearchText('')
        handleButtonClick("all")
        handleChangeSlider([min,max])
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [packName, minParams, maxParams, userIDParams])


    const status = useAppSelector(state => state.app.status)

    const [paramsSearchState, setParamsSearchState] = useState<QueryParamsType>({
        page: '1',
        pageCount: '5',
        userID: '',
        min: '',
        max: '',
        sortPacks:''
    })




    /*
        const debouncedValue = useDebounce<string>(packName, 500)*/

    const urlParamsFilter = filterQueryParams({
        page: pageURL,
        pageCount: pageCountURL,
        packName: packNameURL,
        userID: userIDURL,
        min: minRangeURL,
        max: maxRangeURL
    })
    console.log(status)
    useEffect(() => {
            dispatch(setQueryParamsAC({...urlParamsFilter}))
            dispatch(getPacksTC())
        }, [paramsSearchState]
    )
    const [newName,setNewName]=useState<string>('My new pack')

    const addNewPackHandler = useCallback(() => {
        dispatch(addPackTC(newName))
    },[dispatch])

    return (

        <div className={s.packs_wrapper}>
            <div className={s.packs_header}>
                <h2>Packs List</h2>
                <Button variant={'contained'}
                        className={s.button}
                        onClick={addNewPackHandler}
                >
                    Add new pack
                </Button>
            </div>
            <div className={s.packs_tools}>
                <Search handleChangeSearch={handleChangeSearch} searchText={searchText} setSearchText={setSearchText}/>
                <ButtonGroup buttonValue={buttonValue} changeButton={handleButtonClick}/>
                <NewSlider value={value} setSliderValue={setValue} handleChangeSlider={handleChangeSlider}/>
                <Button onClick={setResetFilterHandler}>
                    <FilterListOffIcon/>
                </Button>

            </div>
            <PacksList/>
        </div>
    )

})
