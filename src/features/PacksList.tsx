import React, {useEffect} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {getPacksTC, setParamsSortPack} from "./packs/packs-reducer";
import s from './packs/Packs.module.css'


export const PacksList = () => {

    const dispatch = useAppDispatch()
    const packs= useAppSelector(state=>state.packs.cardPacks);
    const cardPacksTotalCount = useAppSelector(state=>state.packs.cardPacksTotalCount);
    const pageCount=useAppSelector(state=>state.packs.pageCount)
    const page = useAppSelector(state=>state.packs.page)
    const sort = useAppSelector(state => state.packs.params.sortPacks)
    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));
    }

    useEffect(()=>{
        dispatch(getPacksTC());
    },[])

    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 600}} aria-label="Packs table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortUpdate('name')}
                                   className={sort === '0name' ? s.sortUp : s.sortDown}>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right" onClick={() => sortUpdate('updated')}
                                   className={sort === '0updated' ? s.sortUp : s.sortDown}>Last updated</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { packs.map((p) => (
                        <TableRow
                            key={p._id}

                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {p.name}
                            </TableCell>
                            <TableCell align="left">{p.cardsCount}</TableCell>
                            <TableCell align="right">{formatDate(p.updated)}</TableCell>
                            <TableCell align="right">{p.user_name}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <TablePagination

            />*/}
        </TableContainer>)
}