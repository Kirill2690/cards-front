import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button, Table} from "@mui/material";
import {Preloader} from "../../common/components/preloader/Preloader";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PacksList} from "../PacksList";
import {getPacksTC} from "./packs-reducer";

export const Packs = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const [newPackName, setNewPackName] = useState('NZ')
    const navigate = useNavigate()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
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

              <PacksList/>

        </div>


    );
}