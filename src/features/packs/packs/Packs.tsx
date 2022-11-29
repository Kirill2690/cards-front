import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {PacksList} from "../packList/PacksList";
import {addPackTC, getPacksTC, QueryParamsType, setQueryParamsAC} from "../packs-reducer";
import {useSearchParams} from "react-router-dom";
import {filterQueryParams} from "../../../common/utils/filterQueryParams";
import {Pagination} from "../pagination/Paginator";
import {SearchInput} from "../searchInput/SearchInput";
import {NewSlider} from "../../../common/components/slider/NewSlider";
import {ButtonGroup} from "../ButtonGroup/ButtonGroup";

export type ButtonValuesType = "all" | "my" ;

export const Packs = React.memo(() => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profile._id)
    const userIDParams = useAppSelector(state => state.packs.params.userID)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const minParams = useAppSelector(state => state.packs.params.min)
    const maxParams = useAppSelector(state => state.packs.params.max)
    const packName = useAppSelector(state => state.packs.params.packName)
    const [newName,setNewName]=useState<string>('My new pack')
    const [searchText, setSearchText] = React.useState<string|undefined>(undefined)
    const [buttonValue, setButtonValue] = React.useState<ButtonValuesType>("all")
    const [sliderValue, setSliderValue] = React.useState<number[]>([min, max])
    //Search
    const handleChangeSearch = (text: string|undefined) => {
        dispatch(setQueryParamsAC({packName: text}))
    }
    //Button
    const handleButtonClick =(value:ButtonValuesType) => {
        setButtonValue(value)
        value==="my" ? dispatch(setQueryParamsAC({userID: userId}))
            : dispatch(setQueryParamsAC({userID: undefined}))
    }
    //Slider
    const handleChangeSlider = (newValue: number[]) => {
        setSliderValue(newValue)
        dispatch(setQueryParamsAC({min:newValue[0].toString(),max:newValue[1].toString()}))
    }
    //


    const [paramsSearchState, setParamsSearchState] = useState<QueryParamsType>({
        page: '1',
        pageCount: '5',
        userID: '',
        min: '',
        max: '',
        sortPacks:''
    })

    const [searchParams, setSearchParams] = useSearchParams()

    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
    const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
    const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
    const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''

    const addNewPackHandler = () => {
        dispatch(addPackTC(newName))
    }

    const setResetFilterHandler = () => {
        setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: '',sortPacks:''})
        setSearchParams({page: '1', pageCount: '5'})
        setSearchText('')
        handleButtonClick("all")
        handleChangeSlider([min,max])
    }


    const urlParamsFilter = filterQueryParams({
        page: pageURL,
        pageCount: pageCountURL,
        packName: packNameURL,
        userID: userIDURL,
        min: minRangeURL,
        max: maxRangeURL
    })

    const pageHandler = (valuePage: number) => {
        setParamsSearchState({...paramsSearchState, page: valuePage + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                page: valuePage + '',
                userID: userIDURL,
            })
        })
    }

    const pageCountHandler = (valuePageCount: number) => {
        setParamsSearchState({...paramsSearchState, pageCount: valuePageCount + '', min: '', max: ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                pageCount: valuePageCount + '',
                min: '',
                max: '',
                userID: userIDURL,
            })
        })
    }

    useEffect(() => {
        dispatch(setQueryParamsAC({...urlParamsFilter}))
        dispatch(getPacksTC())
    }, [packName, minParams, maxParams, userIDParams, paramsSearchState])

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
                <SearchInput handleChangeSearch={handleChangeSearch} searchText={searchText} setSearchText={setSearchText}/>
                <ButtonGroup buttonValue={buttonValue} changeButton={handleButtonClick}/>
                <NewSlider sliderValue={sliderValue} setSliderValue={setSliderValue} handleChangeSlider={handleChangeSlider}/>
                <Button onClick={setResetFilterHandler}>
                    <FilterListOffIcon/>
                </Button>
            </div>
            <PacksList/>
            <Pagination callBackPage={pageHandler} callBackPageCount={pageCountHandler}/>
        </div>
    )
})
