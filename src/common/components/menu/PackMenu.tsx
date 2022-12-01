import {PackType} from "../../../api/api";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks";
import React, {useState} from "react";
import {Path} from "../../../app/pages/Routes";
import {setQueryCardsParamsAC} from "../../../features/cards/cards-reducer";
import {Button, Menu, MenuItem} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import {EditPackModal} from "../modals/packs/editPackModal/EditPackModal";
import {DeletePackModal} from "../modals/packs/deletaPackModal/DeletePackModal";



type PropsType = {
    isMyPack: string
    packName?: string
    packId: string
    cardPack_id:string
}

export const PackMenu: React.FC<PropsType> = ({cardPack_id,isMyPack,packName,packId }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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

    const onLearnClickHandler = () => {
        navigate(`/learn/${cardPack_id}`)
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
                        <MenuItem onClick={onLearnClickHandler}>Learn</MenuItem>
                    </>
                    : <MenuItem onClick={onLearnClickHandler}>Learn</MenuItem>

                }

            </Menu>
            {/*{typeModal === 'edit' &&
                <EditPackModal title={'Edit pack'} openModal={openModal} closeModal={closeHandler}
                               packId={packId} packName={}/>
            }
            {typeModal === 'delete' &&
                <DeletePackModal title={'Delete pack'} openModal={openModal} closeModal={closeHandler}
                 packId={packId} packName={packId} />
            }*/}
        </div>
    );
};