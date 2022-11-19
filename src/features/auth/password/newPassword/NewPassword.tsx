import React, {useState} from 'react';
import s from './NewPassword.module.css'
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {AppRootStateType} from "../../../../app/store";
import {useFormik} from "formik";
import {setNewPasswordTC} from "./newPassword-reducer";
import {Button, IconButton, Input, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export const NewPassword = () => {

    const dispatch = useAppDispatch()
    const newPasswordSuccess = useAppSelector((state: AppRootStateType) => state.newPassword.newPasswordSuccess)
    const [showPassword, setShowPassword] = useState(false)
    const {token} = useParams()

    const onClickShowPassword = () => setShowPassword(!showPassword)

    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.password.length < 8) {
                errors.password = 'enter more than 8 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values))
            formik.resetForm()
        }
    })
    if (newPasswordSuccess) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.wrapper_newPassword}>
            <h2 className={s.title}>Create new password</h2>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.inputForm}>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...formik.getFieldProps('password')}
                        placeholder='Password'
                        color={'primary'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={onClickShowPassword}>
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div className={s.error}>
                        {formik.touched.password && formik.errors.password && formik.errors.password}
                    </div>
                </div>
                <div className={s.text}>
                    Create new password and we will send you further instructions to email
                </div>
                <Button style={{borderRadius: 30, width: 375, marginTop: 30}} type="submit" variant="contained">
                    Create new password
                </Button>
            </form>
        </div>

    )
}

//type
type FormikErrorType = {
    password?: string
}
