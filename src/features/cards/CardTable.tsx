import {Button, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppSelector} from "../../common/hooks/hooks";
import s from './Cards.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Card} from "./Card";

export const CardsTable = () => {

    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    /*const [deleteCardData, setDeleteCardData] = useState<CardType | null>(null);
    const [updateCardData, setUpdateCardData] = useState<CardType | null>(null);
    const [isOpenModalCardDelete, setIsOpenModalCardDelete] = useState(false)
    const [isOpenModalCardUpdate, setIsOpenModalCardUpdate] = useState(false)*/
    const status = useAppSelector((state) => state.app.status)




    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="center">Answer</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">Updated</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                 {/*   <TableBody>
                        {cards && cards.map((card) => (
                            <Card  />
                        ))
                            : status !== 'loading' && <TableRow>
                            <TableCell>{'NO CARDS FOUND'}</TableCell>
                        </TableRow>}
                    </TableBody>*/}
                </Table>
            </TableContainer>
        </>
    );
};