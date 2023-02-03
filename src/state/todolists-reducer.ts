import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType
export type removeTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type addTodolistACType = ReturnType<typeof AddTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => todolist.id === action.payload.id
                ? {...todolist, title: action.payload.title} : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => todolist.id === action.payload.id
                ? {...todolist, filter: action.payload.filter} : todolist)
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title,

        }
    } as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}
