import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [
    {id: '1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((todolist) => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }]
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
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title: newTodolistTitle} as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE=TODOLIST-FILTER', id, filter} as const
}