import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {appReducer} from "./app-reducer";
import {profileReducer} from "../features/auth/profile/profile-reducer";
import {registerReducer} from "../features/auth/register/register-reducer";
import {loginReducer} from "../features/auth/login/login-reducer";
import {recoverPasswordReducer} from "../features/auth/password/recoveryPassword/recoveryPassword-reducer";
import {newPasswordReducer} from "../features/auth/password/newPassword/newPassword-reducer";
import {packsReducer} from "../features/packs/packs-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer,
    packs:packsReducer
})

//store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>



