import React, {useEffect} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import s from '../packs/Packs.module.css'
import {Pack} from "../pack/Pack";
import {setQueryParamsAC} from "../packs-reducer";

export const PacksList = () => {

    const dispatch = useAppDispatch()

    const packs = useAppSelector(state => state.packs.cardPacks);
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const sortUpdate = (sortParams: string) => {
        sort === `1${sortParams}` ? dispatch(setQueryParamsAC({sortPacks:`0${sortParams}`}))
            : dispatch(setQueryParamsAC({sortPacks:`1${sortParams}`}));
        //
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 600}} aria-label="Packs table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortUpdate('name')}
                                   className={sort === '1name' ? s.sortUp : s.sortDown}>Name</TableCell>
                        <TableCell align="right" onClick={() => sortUpdate('cardsCount')}
                                   className={sort === '1cardsCount' ? s.sortUp : s.sortDown}>Cards</TableCell>
                        <TableCell align="right" onClick={() => sortUpdate('updated')}
                                   className={sort === '1updated' ? s.sortUp : s.sortDown}>Last updated</TableCell>
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
                              cardPack_id={p._id}
                        />)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}