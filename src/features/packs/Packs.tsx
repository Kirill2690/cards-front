import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {PacksList} from "../PacksList";
import {addPackTC, getPacksTC, QueryParamsType, setQueryParamsAC} from "./packs-reducer";
import {Search} from "../../common/components/search/Search";
import {NewSlider} from "../../common/components/slider/NewSlider";
import {useSearchParams} from "react-router-dom";
import {filterQueryParams} from "../../common/utils/filterQueryParams";


export const Packs = () => {

    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const [searchParams, setSearchParams] = useSearchParams()
    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
    const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
    const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
    const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''


    const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')

    const handleChangeSearch = (text: string) => {
        dispatch(setQueryParamsAC({packName: text}))
    }
    const setResetFilterHandler = () => {
        setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: '',sortPacks:''})
        setSearchParams({page: '1', pageCount: '5'})
        setPackName('')
    }


    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max, packName])


    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

// const isMyPack = useAppSelector(state => state.packs.isMyPack)
// const sortPacks = useAppSelector(state => state.packs.params.sortPacks)
    console.log(status)

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

    useEffect(() => {
            dispatch(setQueryParamsAC({...urlParamsFilter}))
            dispatch(getPacksTC())
        }, [paramsSearchState]
    )
    const [newName,setNewName]=useState<string>('My new pack')

    const addNewPackHandler = () => {
        dispatch(addPackTC(newName))
    }

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
                <Search handleChangeSearch={handleChangeSearch}/>

                <NewSlider/>
                <Button onClick={setResetFilterHandler}>
                    <FilterListOffIcon/>
                </Button>

            </div>
            <PacksList/>
        </div>
    )

}
