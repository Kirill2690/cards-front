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
import {useDebounce} from "../../../common/hooks/debounce";
import {SearchInput} from "../searchInput/SearchInput";
import {NewSlider} from "../../../common/components/slider/NewSlider";
import {ButtonGroup} from "../ButtonGroup/ButtonGroup";

export type ButtonValuesType = "all" | "my" ;
export const Packs = () => {



    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const userIDParams = useAppSelector(state => state.packs.params.userID)
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const minParams = useAppSelector(state => state.packs.params.min)
    const maxParams = useAppSelector(state => state.packs.params.max)

    const [value, setValue] = React.useState<number[]>([min, max]);
    const [searchText, setSearchText] = React.useState<string>("");
    const [newName,setNewName]=useState<string>('My new pack')

    const handleChangeSlider = (newValue: number[]) => {
        setValue(newValue)
        dispatch(setQueryParamsAC({min:newValue[0].toString(),max:newValue[1].toString()}))
    }

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

    const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')

 /*   const handleChangeSearch = (text: string) => {
        dispatch(setQueryParamsAC({packName: text}))
    }
*/
    const [buttonValue, setButtonValue] = React.useState<ButtonValuesType>("all");

    const handleButtonClick =(value:ButtonValuesType) => {
        setButtonValue(value)
        value==="my" ? dispatch(setQueryParamsAC({userID: userId}))
            : dispatch(setQueryParamsAC({userID: ""}))
    }
    const searchValueTextHandler = (valueSearch: string) => {
        setPackName(valueSearch)
        setSearchParams({...filterQueryParams({...paramsSearchState, packName: valueSearch, userID: userIDURL})})
    }


    const addNewPackHandler = () => {
        dispatch(addPackTC(newName))
    }

    /*const setResetFilterHandler = () => {
        /!*setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: '',sortPacks:''})
        setSearchParams({page: '1', pageCount: '5'})
        setSearchText('')*!/

    }*/
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
                packName
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
                packName
            })
        })
    }

    const debouncedValue = useDebounce<string>(packName, 500)



    useEffect(() => {
            dispatch(setQueryParamsAC({...urlParamsFilter}))
            dispatch(getPacksTC())
        }, [paramsSearchState,debouncedValue]
    )

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
                <SearchInput searchValueText={searchValueTextHandler} valueSearch={packName}/>
                <ButtonGroup buttonValue={buttonValue} changeButton={handleButtonClick}/>
                <NewSlider value={value} setSliderValue={setValue} handleChangeSlider={handleChangeSlider}/>
                <Button onClick={setResetFilterHandler}>
                    <FilterListOffIcon/>
                </Button>
            </div>
            <PacksList/>
            <Pagination callBackPage={pageHandler} callBackPageCount={pageCountHandler}/>
        </div>
    )
}
