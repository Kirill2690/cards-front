import React from 'react';
import s from './Login.module.css'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button, Checkbox, FormControlLabel, IconButton, TextField} from '@mui/material';
import {Header} from "../../header/Header";
import {Navigate, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {loginTC} from "./login-reducer";

type  LocalStateType = {
    password: string;
    showPassword: boolean;
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLogged = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 5) {
                errors.password = 'need more symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    const [values, setValues] = React.useState<LocalStateType>({
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword,});
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onClickSingUp = () => {
        navigate('/register')
    }
    const onClickForgotPas = () => {
        navigate('/recovery-password')
    }
    if (isLogged) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.projectsBlock}>
            <div className={s.page}>
                <span className={s.title}>Sing in</span>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.containerEmail}>
                        <TextField className={s.email} label="Email" multiline variant="standard"
                                   {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red', fontSize: 12}}>{formik.errors.email}</div>}
                    </div>
                    <FormControl className={s.password} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red', fontSize: 12}}>{formik.errors.password}</div>}
                    <div className={s.containerCheck}>
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox{...formik.getFieldProps('rememberMe')}
                                                            checked={formik.values.rememberMe}/>}/>
                    </div>
                    <div className={s.containerForgot}>
                        <span className={s.forgot} onClick={onClickForgotPas}>
                            Forgot password?
                        </span>
                    </div>
                    <Button style={{borderRadius: 30, width: 347, marginTop: 69}} type="submit" variant="contained">
                        Sing in
                    </Button>
                    <div className={s.question}>
                        Already have an account?
                    </div>
                    <div className={s.singUp} onClick={onClickSingUp}>
                        Sing Up
                    </div>
                </form>
            </div>
        </div>
    );
};


