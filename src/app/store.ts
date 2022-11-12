import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {appReducer} from "./app-reducer";
import {profileReducer} from "../features/auth/profile/profile-reducer";
import {registerReducer} from "../features/auth/register/register-reducer";
import {loginReducer} from "../features/auth/login/login-reducer";
import {recoverPasswordReducer} from "../features/auth/recoveryPassword/recoveryPassword-reducer";
import {newPasswordReducer} from "../features/auth/newPassword/newPassword-reducer";



const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// типизация dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>



