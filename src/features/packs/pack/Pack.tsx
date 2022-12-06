import React, {useState} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {DeletePackModal} from "../../../common/components/modals/packs/deletaPackModal/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/packs/editPackModal/EditPackModal";



type PackPropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string

}

export const Pack = React.memo(({
                                    userId,
                                    packId,
                                    name,
                                    cardsCount,
                                    updated,
                                    user_name
                                }: PackPropsType) => {
    const navigate = useNavigate()

    const dispatch=useAppDispatch()


    const profile_Id = useAppSelector(state => state.profile?._id)
    const [typeModal,setTypeModal]=useState('')
    const [openModal, setOpenModal] = useState(false);
    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);




    const isMyPacks = userId === profile_Id

    const handleEditModal = () => {
        setTypeModal('edit')
        openHandler()

    };

    const onDeletePackHandler = () => {
        setTypeModal('delete')
        openHandler()
    }


    const onLearnClickHandler = () => {
        navigate(`/learn/${packId}`)
    }

    const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    return (

        <>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="left">
                    <NavLink to={`/cards?cardsPack_id=${packId}&page=1&pageCount=5`}>{name}</NavLink>
                </TableCell>
                <TableCell align="left">{cardsCount}</TableCell>
                <TableCell align="right">{formatDate(updated)}</TableCell>
                <TableCell align="right">{user_name}</TableCell>
                <TableCell align="right">
                    <SchoolOutlinedIcon onClick={onLearnClickHandler}/>
                    {isMyPacks && <EditIcon onClick={handleEditModal}/>}
                    {isMyPacks && <DeleteOutlineIcon onClick={onDeletePackHandler}/>}
                </TableCell>
                {typeModal === 'edit' &&
                    <EditPackModal title='Edit pack' openModal={openModal} packId={packId} closeModal={closeHandler}
                                   packName={name}/>
                }
                {typeModal === 'delete' &&
                    <DeletePackModal title='Delete pack' openModal={openModal} packId={packId}
                                     closeModal={closeHandler} packName={name} />
                }
            </TableRow>
        </>
    )
})