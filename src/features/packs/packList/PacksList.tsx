import React from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {setParamsSortPack} from "../packs-reducer";
import s from '../packs/Packs.module.css'
import {Pack} from "../pack/Pack";



export const PacksList = () => {

    const dispatch = useAppDispatch()

    const packs = useAppSelector(state => state.packs.cardPacks);
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 600}} aria-label="Packs table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortUpdate('packName')}
                                   className={sort === '0packName' ? s.sortUp : s.sortDown}>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right" onClick={() => sortUpdate('updated')}
                                   className={sort === '0updated' ? s.sortUp : s.sortDown}>Last updated</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs && packs.map((p) => (
                        <Pack key={p._id}
                              packId={p._id}
                              userId={p.user_id}
                              user_name={p.user_name}
                              name={p.name}
                              updated={p.updated}
                              cardsCount={p.cardsCount}
                        />)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}