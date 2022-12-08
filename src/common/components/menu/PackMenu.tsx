import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {EditPackModal} from "../modals/packs/editPackModal/EditPackModal";
import {DeletePackModal} from "../modals/packs/deletaPackModal/DeletePackModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import {useAppSelector} from "../../hooks/hooks";



type PropsType = {
    isMyPack: string,
    packName: string,
    packId: string,



}

export const PackMenu: React.FC<PropsType> = ({packName, packId, isMyPack}) => {

    const cover= useAppSelector(state => state.cards.packDeckCover)

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState('')

    const open = Boolean(anchorEl);


    const openHandler = () => setOpenModal(true);
    const closeHandler = () => setOpenModal(false);


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

    const learnCards = () => {
        navigate(`/learn/${packId ? packId:''}`)
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
                sx={{maxWidth:'1px',color:'black',left:'10px',top:'-18px',fontSize:'30px'}}
            >
                ≡
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {isMyPack
                    ? <>
                        <MenuItem onClick={handleEdit}>Edit <EditIcon/></MenuItem>
                        <MenuItem onClick={handleDelete}>Delete <DeleteIcon/></MenuItem>
                        <MenuItem onClick={learnCards}>Learn <SchoolIcon/> </MenuItem>
                    </>
                    : <MenuItem onClick={learnCards}>Learn <SchoolIcon/></MenuItem>

                }

            </Menu>
            {typeModal === 'edit' &&
                <EditPackModal title={'Edit pack'} openModal={openModal} closeModal={closeHandler}
                               packId={packId} packName={packName} packCover={cover}/>
            }

            {typeModal === 'delete' &&
                <DeletePackModal title={'Delete pack'} openModal={openModal} closeModal={closeHandler}
                                 packId={packId} packName={packName}/>
            }
        </div>
    );
};