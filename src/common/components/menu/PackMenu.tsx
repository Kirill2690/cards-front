import {PackType} from "../../../api/api";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks";
import React, {useState} from "react";
import {Path} from "../../../app/pages/Routes";
import {setQueryCardsParamsAC} from "../../../features/cards/cards-reducer";
import {Button, Menu, MenuItem} from "@mui/material";
import ListIcon from '@mui/icons-material/List';



type PropsType = {
    packId: string
    isMyPack: boolean
    packData?: PackType
}

export const PackMenu: React.FC<PropsType> = ({packId, isMyPack, packData}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);

    const open = Boolean(anchorEl);


    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);

    const [typeModal, setTypeModal] = useState('')
    const openEditHandler = () => {
        setTypeModal('edit')
        openHandler()
    }
    const openDeleteHandler = () => {
        setTypeModal('delete')
        openHandler()
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLearn = () => {
        handleClose()
        navigate(`${Path.Learn}/${packId}`)
        dispatch(setQueryCardsParamsAC({cardsPack_id: packId}))

    }
    const handleDelete = () => {
        handleClose()
        openDeleteHandler()
    }
    const handleEdit = () => {
        handleClose()
        openEditHandler()
    }

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ListIcon/>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {isMyPack
                    ? <>
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={handleLearn}>Learn</MenuItem>
                    </>
                    : <MenuItem onClick={handleLearn}>Learn</MenuItem>

                }

            </Menu>
        </div>
    );
};