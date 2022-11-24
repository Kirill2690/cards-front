import React, {useEffect, useState} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination,} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {getPacksTC, setParamsSortPack} from "./packs/packs-reducer";
import s from './packs/Packs.module.css'
import {Pack} from "./packs/Pack";


export const PacksList = () => {

    const dispatch = useAppDispatch()

    const packs = useAppSelector(state => state.packs.cardPacks);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const [currentPage, setCurrentPage] = useState(page)
    const [rowsPerPage,setRowsPerPage]=useState(pageCount)

    useEffect(() => {
        dispatch(getPacksTC());
    }, [])

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));
    }

    /*  const formatDate = (date: Date | string | number) => {
          return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
      }*/

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setCurrentPage(newPage)
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(+e.target.value)
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cardPacksTotalCount}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>)
}