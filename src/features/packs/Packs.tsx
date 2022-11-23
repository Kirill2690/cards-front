import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PacksList} from "../PacksList";
import {getPacksTC, setQueryParamsAC} from "./packs-reducer";
import {Search} from "../../common/components/search/Search";
import {NewSlider} from "../../common/components/slider/NewSlider";


export const Packs = () => {

    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)

    const packName = useAppSelector(state => state.packs.params.packName)

    const handleChangeSearch = (text:string) => {
        dispatch(setQueryParamsAC({packName:text}))
    }

    useEffect(()=>{dispatch(getPacksTC())},[min,max,packName])


    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const [newPackName, setNewPackName] = useState('NZ')
    const navigate = useNavigate()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
        // const isMyPack = useAppSelector(state => state.packs.isMyPack)
   // const sortPacks = useAppSelector(state => state.packs.params.sortPacks)
    console.log(status)

    const addNewPackHandler = () => {
        /*dispatch(getPacksTC())*/
    }

    return (
        <div className={s.wrapper}>
            <div className={s.packListHeader}>
                <h2>Packs List</h2>
                <Button variant={'contained'}
                        className={s.button}
                        onClick={addNewPackHandler}
                >
                    Add new pack
                </Button>

            </div>
<div>
    <div className={s.search_components}>
        <Search handleChangeSearch={handleChangeSearch}/>
        //two buttons
        <div className={s.rangeSlider}>
            <NewSlider/>
        </div>

    </div>
</div>
              <PacksList/>

        </div>


    );
}