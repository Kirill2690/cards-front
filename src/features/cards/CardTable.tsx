import {Button, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppSelector} from "../../common/hooks/hooks";
import s from './Cards.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const CardsTable = () => {

    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    /*const [deleteCardData, setDeleteCardData] = useState<CardType | null>(null);
    const [updateCardData, setUpdateCardData] = useState<CardType | null>(null);
    const [isOpenModalCardDelete, setIsOpenModalCardDelete] = useState(false)
    const [isOpenModalCardUpdate, setIsOpenModalCardUpdate] = useState(false)*/
    const status = useAppSelector((state) => state.app.status)


    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

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
                    <TableBody>
                        {cards.length ? status !== 'loading' && cards?.map((card) => (
                            <TableRow
                                key={card._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {card.question}
                                </TableCell>
                                <TableCell align="center">{card.answer}</TableCell>
                                <TableCell align="center"><Rating name="read-only" value={card.grade} readOnly/>
                                </TableCell>
                                <TableCell align="center">{formatDate(card.updated)}</TableCell>
                                <TableCell className={s.buttonBlock}>
                                    <Button
                                        onClick={() => console.log(card)}
                                        disabled={userId !== card.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteOutlineIcon/>}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => console.log(card)}
                                        disabled={userId !== card.user_id}
                                        color="secondary" size="small"
                                        startIcon={<EditIcon/>}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                            : status !== 'loading' && <TableRow>
                            <TableCell>{'NO CARDS FOUND'}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};