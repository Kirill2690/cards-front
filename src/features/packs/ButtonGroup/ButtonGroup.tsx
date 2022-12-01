import React, { useCallback } from 'react';
import {Button} from "@mui/material";
import s from './ButtonGroup.module.css'
import {ButtonValuesType} from "../packs/Packs";


type ButtonGroupPropsType = {
    buttonValue:ButtonValuesType,
    changeButton:(value:ButtonValuesType)=>void
}

export const ButtonGroup = React.memo((props:ButtonGroupPropsType) => {

    const handleClickMy = useCallback(()=>{
        props.changeButton("my")
    },[props.changeButton])
    const handleClickAll =useCallback(()=>{
        props.changeButton("all")
    },[props.changeButton])

    return (
        <div >
            <Button
                className={s.button}
                variant={props.buttonValue === "my" ? 'contained' : 'outlined'}
                onClick={handleClickMy}
            >My</Button>
            <Button className={s.button}
                    variant={props.buttonValue === "all" ? 'contained' : 'outlined'}
                    onClick={handleClickAll}
            >All</Button>

        </div>
    );
})
