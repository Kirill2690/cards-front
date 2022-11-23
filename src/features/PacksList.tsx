import React, {useEffect} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {getPacksTC} from "./packs/packs-reducer";


export const PacksList = () => {

    const dispatch = useAppDispatch()
    const packs= useAppSelector(state=>state.packs.cardPacks);
    const cardPacksTotalCount = useAppSelector(state=>state.packs.cardPacksTotalCount);
    const pageCount=useAppSelector(state=>state.packs.pageCount)
    const page = useAppSelector(state=>state.packs.page)
    // const isMyPacks = useAppSelector(state=>state.packs.isMyPacks)
    // const search=useAppSelector(state=>state.packs.search)
    // const minMaxCardsCount = useAppSelector(state=>state.packs.minMaxCardsCount)

    useEffect(()=>{

        dispatch(getPacksTC());

    },[])


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="Packs table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last updated</TableCell>
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
                            <TableCell align="right">{p.updated}</TableCell>
                            <TableCell align="right">{p.user_name}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />*/}
        </TableContainer>)
}