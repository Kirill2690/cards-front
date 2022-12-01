import React, { useCallback } from 'react';
import {Button} from "@mui/material";
import s from './ButtonGroup.module.css'
import {ButtonValuesType} from "../packs/Packs";


type ButtonGroupPropsType = {
    buttonValue:ButtonValuesType,
    changeButton:(value:ButtonValuesType)=>void
}

export const ButtonGroup = React.memo((props:ButtonGroupPropsType) => {

    const handlerClickMy = useCallback(()=>{
        props.changeButton("my")
    },[props.changeButton])
    const handlerClickAll =useCallback(()=>{
        props.changeButton("all")
    },[props.changeButton])

    return (
        <div >
            <Button
                className={s.button}
                variant={props.buttonValue === "my" ? 'contained' : 'outlined'}
                onClick={handlerClickMy}
            >My</Button>
            <Button className={s.button}
                    variant={props.buttonValue === "all" ? 'contained' : 'outlined'}
                    onClick={handlerClickAll}
            >All</Button>
        </div>

    );
})

