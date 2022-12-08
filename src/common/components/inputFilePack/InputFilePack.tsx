import React, { ChangeEvent } from 'react';
import Button from "@mui/material/Button";
import s from "./InputFilePack.module.css"

type InputFilePropsType = {
    changeCoverHandler:(img:string)=>void
}

export const InputFilePack = (props:InputFilePropsType) => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file,
                    (file64: string) => props.changeCoverHandler(file64))
            } else {
                console.error('Error: ', 'File is too large')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label>
            <input type="file"
                   accept="image/*"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
            />
            <Button className={s.button} variant="text" component="span">
                Change cover
            </Button>
        </label>
    )
}
