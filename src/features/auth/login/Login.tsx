import {loginTC} from "./login-reducer";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import React from "react";
import s from './Login.module.css'
import {Link, Navigate} from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export const Login = () => {
const dispatch = useAppDispatch();
const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}

const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
        rememberMe: false,
    },
    validate: (values) => {
        const errors: FormikErrorType = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must contain more than 8 symbols';
        }
        return errors;
    },
    onSubmit: values => {
        dispatch(loginTC(values));
    },
});

const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
    password: '',
    showPassword: false,
});

const handleClickShowPassword = () => {
    setValuesPassword({
        ...valuesPassword,
        showPassword: !valuesPassword.showPassword,
    });
};

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

if (isLoggedIn) {
    return <Navigate to={'/profile'}/>
}

return (
    <div className={s.wrapper}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <div className={s.title}>Sign In</div>
            <FormControl variant="standard">
                <InputLabel color="secondary">Email</InputLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder={'Email'}
                    className={s.input}
                    color="secondary"
                    {...formik.getFieldProps('email')}
                />
            </FormControl>
            {formik.errors.email && formik.touched.email &&
                <div style={{ color: 'red' }}>{formik.errors.email}</div>}

            <FormControl variant="standard">
                <InputLabel color="secondary">Password</InputLabel>
                <Input
                    id="password"
                    type={valuesPassword.showPassword ? 'text' : 'password'}
                    placeholder={'Password'}
                    className={s.input}
                    color="primary"
                    {...formik.getFieldProps('password')}
                    autoComplete="on"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {valuesPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {formik.errors.password && formik.touched.password &&
                <div style={{ color: 'red' }}>{formik.errors.password}</div>}

            <FormControlLabel label={'Remember me'}
                              control={<Checkbox color="secondary"
                                                 checked={formik.values.rememberMe}
                                                 {...formik.getFieldProps('rememberMe')}
                              />
                              } />
            <Link className={s.textLink} to={'/recovery-password'}>Forgot Password</Link>
            <Button color="primary" variant={'contained'} type="submit">Login</Button>
            Don’t have an account?
            <Link className={s.textLink} to={'/register'}>Sign Up</Link>
        </form>
    </div>
);
};