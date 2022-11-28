import s from "../packs/Packs.module.css";
import React from "react";
import {Button} from "@mui/material";



export const NewPack=({})=>{

    return  <div className={s.wrapper}>
        <div className={s.packListHeader}>
            <h2>{}</h2>
        </div>
        <span className={s.text}>This pack is empty. Click add new card to fill this pack</span>
        <Button variant={'contained'}
                className={s.button}
                onClick={()=>console.log('1')}
        >
            Add new card
        </Button>
    </div>
}