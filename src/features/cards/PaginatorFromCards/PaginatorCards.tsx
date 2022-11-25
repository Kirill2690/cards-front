import {TablePagination} from "@mui/material";
import {useAppSelector} from "../../../common/hooks/hooks";
import React from "react";

type PropsType = {
    callBackPage: (valuePage: number) => void
    callBackPageCount: (valuePageCount: number) => void
}

export const CardsPagination = ({callBackPage, callBackPageCount}: PropsType) => {

    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)

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
            count={cardsTotalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}