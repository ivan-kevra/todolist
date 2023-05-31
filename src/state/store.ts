import {tasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import thunkMiddleWare, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store
