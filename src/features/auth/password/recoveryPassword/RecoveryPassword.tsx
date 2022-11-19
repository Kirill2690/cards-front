import {Button, CircularProgress, FormControl, IconButton, Input, InputAdornment} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import s from './RecoveryPassword.module.css'
import {recoverTC} from "./recoveryPassword-reducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState} from "react";




type RegistrationErrorType = {
    email?: string
}

export const RecoveryPassword = () => {

    const dispatch = useAppDispatch()
    const forgotPasswordSuccess = useAppSelector(state => state.recoverPassword.forgotPasswordSuccess)
    const [showEmail, setShowEmail] = useState(false)
    const onClickShowEmail = () => setShowEmail(!showEmail)


    const formik = useFormik({
        initialValues: {
            email: '',
            message: "<div>To change passwords, follow the link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>",
        },
        validate: (values) => {
            const errors: RegistrationErrorType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(recoverTC(values))
            formik.resetForm()
        }
    })

    if (forgotPasswordSuccess) {
        return <Navigate to={'/checkEmail'}/>
    }

    return (
            <div className={s.ForgotPasBlock}>
                <h2 className={s.title}>Forgot your password?</h2>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <div className={s.inputForm}>
                        <Input
                            id="email"
                            type={showEmail ? "text" : "email"}
                            {...formik.getFieldProps('email')}
                            placeholder='Email'
                            className={s.input}
                            color={'primary'}
                            endAdornment={

                        <InputAdornment position="end">
                        <IconButton  onClick={onClickShowEmail}>
                            {showEmail ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                        </InputAdornment>
                        }
                            />

                        <div className={s.error}>
                            {formik.touched.email && formik.errors.email && formik.errors.email}
                        </div>
                    </div>
                    <div className={s.dontHaveAccountTitle}>
                        Enter your email address and we will send you further instructions
                    </div>
                    <Button style={{borderRadius: 30, width: 375, marginTop: 30}} type="submit" variant="contained">
                        Send Instructions
                    </Button>
                    <div className={s.dontHaveAccountTitle}>
                        Did you remember your password?
                    </div>
                    <NavLink to="/login" className={s.login}> Try logging in </NavLink>
                </form>
            </div>

)
}

