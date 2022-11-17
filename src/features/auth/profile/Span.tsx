import {ChangeEvent, useState} from "react";
import React from "react";
import {Button} from "@mui/material";
import s from './Span.module.css'
import pencil from '../../../assets/images/images.png'


type SpanPropsType = {
    value: string
    onChange: (name: string) => void
}

export const Span = React.memo(function (props: SpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setName(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(name);
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onblurHandler = () => {
        setEditMode(false)
    }

    return editMode
        ? <div className={s.inputBox}>
            <input value={name} onChange={changeName} autoFocus onBlur={onblurHandler}/>
            <Button onClick={activateViewMode}>Save</Button>
        </div>
        : <div className={s.profileNameBox} onClick={activateEditMode}>
            <span className={s.profileName}>{props.value}</span>
            <img className={s.profilePencil} src={pencil} alt="pencil" />
        </div>

});