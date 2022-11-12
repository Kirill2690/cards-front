import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from "./login-reducer";
import {registerReducer} from "./register-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer
})

export const store = createStore(rootReducer,(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>


// @ts-ignore
window.store = store