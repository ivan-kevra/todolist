import {TodolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
type ActionType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.newTodolistTitle, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, title: action.newTodolistTitle}
                : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => todolist.id === action.todolistId
                ? {...todolist, filter: action.newFilter}
                : todolist)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    } as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        newTodolistTitle
    } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        newTodolistTitle
    } as const
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        newFilter
    } as const
}