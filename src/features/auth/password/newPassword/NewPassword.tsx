import React, {useState} from 'react';
import s from './NewPassword.module.css'
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {AppRootStateType} from "../../../../app/store";
import {useFormik} from "formik";
import {setNewPasswordTC} from "./newPassword-reducer";
import {Button, IconButton, Input} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
    password?: string
}
export const NewPassword = () => {
    const navigate = useNavigate()

const dispatch = useAppDispatch()
const isPassChanged = useAppSelector((state: AppRootStateType) => state.newPassword.isPassChanged)
/*const appStatus = useAppSelector(state => state.app.status)*/

const params = useParams()
const token = params.token


const [showPassword, setShowPassword] = useState(false)
const onClickShowPassword = () => setShowPassword(!showPassword)


const formik = useFormik({
    initialValues: {
        password: '',
        resetPasswordToken: token,
    },
    validate: (values) => {
        const errors: FormikErrorType = {}
        if (values.password.length < 8) {
            errors.password = 'enter more than 7 symbols'
        }
        return errors
    },
    onSubmit: values => {
        dispatch(setNewPasswordTC(values))
        formik.resetForm()
    }
})
if (isPassChanged) {
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
                    className={s.input}
                    color={'primary'}
                />
                <IconButton className={s.icon} onClick={onClickShowPassword}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
                <div className={s.error}>
                    {formik.touched.password && formik.errors.password && formik.errors.password}
                </div>
            </div>
            <div className={s.text}>
                Create new password and we will send you further instructions to email
            </div>
            <div className={s.buttonForm}>
                <Button onClick={() => navigate('/login')}
                        className={s.button}
                        variant={'contained'}>
                    Create new password</Button>
            </div>
        </form>
    </div>
)
}

