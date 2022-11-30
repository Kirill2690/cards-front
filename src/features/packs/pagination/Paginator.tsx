import {TablePagination} from "@mui/material";
import {useAppSelector} from "../../../common/hooks/hooks";
import React from "react";

type PaginationPropsType = {
    callBackPage: (valuePage: number) => void
    callBackPageCount: (valuePageCount: number) => void
}
//
export const Pagination = ({callBackPage,callBackPageCount}: PaginationPropsType) => {

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        callBackPage(newPage + 1)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        callBackPageCount(+event.target.value)
    };

    return (
        <TablePagination
            component="div"
            count={cardPacksTotalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}