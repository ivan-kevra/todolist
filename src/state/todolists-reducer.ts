import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((todolist) => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist)
        case 'CHANGE=TODOLIST-FILTER':
            return state.map((todolist) => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist)
        default:
            return state
    }
    return state
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle} as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE=TODOLIST-FILTER', id, filter} as const
}