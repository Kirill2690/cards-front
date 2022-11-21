import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import s from './Packs.module.css'
import {Button, Table} from "@mui/material";
import {Preloader} from "../../common/components/preloader/Preloader";
import React, {useState} from "react";
import {addNewPackTC} from "./packs-reducer";

    export const Packs = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const [newPackName, setNewPackName] = useState('NZ')


    const addNewPackHandler = () => {
        dispatch(addNewPackTC(newPackName))
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
            {status === 'loading'
                ? <Preloader/>
                : <Table/>
            }
        </div>


    );
}