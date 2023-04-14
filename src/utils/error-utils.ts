import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";


export const handlerServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
};
export const handlerServerNetworkError = (error: { message: string }, dispatch: ThunkDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
};

//types
type ThunkDispatch = Dispatch<ActionsType>
type ActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>
